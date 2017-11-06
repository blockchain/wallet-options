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

if [ "$BC_ENV" == "prod" ]; then
    printf "Do you want to proceed (YES/NO)? "
    read ANSWER
    if echo "${ANSWER}" | grep -q "^YES" ; then
        echo "Uploading to production bucket ..."
    else
        echo "Upload canceled"
        exit 1
    fi
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
    NEW_SHA=`shasum -a 256 ${BASEDIR}/wallet-options.json | sed -e s,${BASEDIR}/,,g`
    cat ${OUTFILE} | sed -e "s,^.* wallet-options.json,${NEW_SHA},g" > ${TMP_FILE}
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
