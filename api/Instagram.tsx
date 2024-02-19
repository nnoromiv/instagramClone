import { DocumentData } from "firebase/firestore"




const mergeStoryByUid = (array: DocumentData[] | null) => {
    const mergedArray = [];

    // Group objects by _uid
    if (array !== null) {
        const groupedByUid = array.reduce((acc: any, obj: any) => {
            const uid = obj._uid;
            if (!acc[uid]) {
                acc[uid] = [];
            }
            acc[uid].push(obj);
            return acc;
        }, {});


        // Merge objects with the same _uid
        for (const uid in groupedByUid) {
            if (groupedByUid.hasOwnProperty(uid)) {
                const mergedObject = groupedByUid[uid].reduce((merged: any, obj: any) => {
                    // Merge properties from all objects with the same _uid
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            if (!merged[key]) {
                                merged[key] = obj[key];
                            } else if (Array.isArray(merged[key])) {
                                merged[key] = merged[key].concat(obj[key]);
                            } else if (typeof merged[key] === 'object') {
                                merged[key] = { ...merged[key], ...obj[key] };
                            } else {
                                merged[key] = obj[key];
                            }
                        }
                    }
                    return merged;
                }, {});
                mergedArray.push(mergedObject);
            }
        }
    }

    return mergedArray;
};



export {
    mergeStoryByUid,
}