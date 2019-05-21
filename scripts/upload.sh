#!/bin/sh

# Upload files to Google cloud storage cdn


set -ue


if [ "$#" -ne 1 ]; then
    echo "Usage: upload.sh ENV"
    echo "ENV: dev, staging, testnet, prod"
    exit -1
fi


ORIG_PWD=${PWD}
TMP_FILE=tmp

function cleanup {
    echo "Cleaning up ..."

    cd ${ORIG_PWD}

    rm -f ${TMP_FILE}

    echo "Exit"
}

trap cleanup EXIT


BC_ENV=$1

LOCAL_DIR="./${BC_ENV}/" 
REMOTE_BUCKET="gs://bc-resources-${BC_ENV}/Resources/"


echo "Syncing: ${LOCAL_DIR} => ${REMOTE_BUCKET}"
echo "Dry run ..."
gsutil -m rsync -e -r -n ${LOCAL_DIR} ${REMOTE_BUCKET}

WALLET_OPTIONS_V4_URL=""
WALLET_OPTIONS_URL=""
if [ "$BC_ENV" == "prod" ]; then
    WALLET_OPTIONS_V4_URL="https://login.blockchain.com/Resources/wallet-options-v4.json"
    WALLET_OPTIONS_URL="https://blockchain.info/Resources/wallet-options.json"
elif [ "$BC_ENV" == "testnet" ]; then
    WALLET_OPTIONS_V4_URL="https://login-testnet.blockchain.com/Resources/wallet-options-v4.json"
    WALLET_OPTIONS_URL="https://testnet.blockchain.info/Resources/wallet-options.json"
else
    WALLET_OPTIONS_V4_URL="https://login-${BC_ENV}.blockchain.com/Resources/wallet-options-v4.json"
    WALLET_OPTIONS_URL="https://explorer.${BC_ENV}.blockchain.info/Resources/wallet-options.json"
fi

# compare to deployed version before uploading
printf "\nwallet-options-v4 changes against ${BC_ENV}:\n"
curl -s ${WALLET_OPTIONS_V4_URL} | diff - ${BC_ENV}/wallet-options-v4.json || true

printf "\nwallet-options changes against ${BC_ENV}:\n"
curl -s ${WALLET_OPTIONS_URL=} | diff - ${BC_ENV}/wallet-options.json || true

printf "\nDo you want to proceed (YES/NO)? "
read ANSWER

if echo "${ANSWER}" | grep -q "^YES" ; then
    echo "Uploading to ${BC_ENV=} bucket ..."
else
    echo "Upload canceled"
    exit 1
fi

echo "Copying wallet-options file tree and setting cache to 10 minutes"
gsutil -m -h "Cache-Control:private, max-age=600" rsync -e -r ${LOCAL_DIR} ${REMOTE_BUCKET}


if [ "$BC_ENV" == "prod" ]; then
    BASEDIR="prod"
    OUTDIR="Checksum-Explorer"
    OUTFILE=${OUTDIR}/manifest.txt


    echo "Pulling ${OUTDIR} repo ... "
    rm -rf ${OUTDIR}
    git clone git@github.com:blockchain/${OUTDIR}.git

    echo "Calculating wallet-options.json checksum ... "
    NEW_SHA1=`shasum -a 256 ${BASEDIR}/wallet-options.json | sed -e s,${BASEDIR}/,,g`
    NEW_SHA2=`shasum -a 256 ${BASEDIR}/wallet-options-v4.json | sed -e s,${BASEDIR}/,,g`
    cat ${OUTFILE} | sed -e "s,^.* wallet-options.json,${NEW_SHA1},g" | sed -e "s,^.* wallet-options-v4.json,${NEW_SHA2},g" > ${TMP_FILE}
    mv ${TMP_FILE} ${OUTFILE}


    cd ${OUTDIR}

    echo "Checksum diff:"
    git diff

    printf "Do you want to commit changes to Github (y/n)? "
    read ANSWER
    if echo "${ANSWER}" | grep -q "^[yY]" ; then
        echo "Commiting..."
    else
        echo "Commit canceled"
        exit 1
    fi

    git add -A
    git commit -a -m "sync"
    git push

    cd - > /dev/null
    rm -rf ${OUTDIR}
fi
