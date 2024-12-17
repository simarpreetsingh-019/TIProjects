// src/api.js
export const getCid = async (username, password) => {
    // const response = await fetch('/api/getCid', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ username, password }),
    // });
    ///https://gateway.pinata.cloud/ipfs/QmaLaLWkVJssifYkod8pHJV7p6mKjgCx5GrZj7sC7P8hvv
    // const data = await response.json();
    const data={cid:"QmaLaLWkVJssifYkod8pHJV7p6mKjgCx5GrZj7sC7P8hvv"}
    return data.cid; // Assuming the response contains { cid: "your_cid_here" }
};

export const fetchDocumentFromIPFS = async (cid) => {
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/QmaLaLWkVJssifYkod8pHJV7p6mKjgCx5GrZj7sC7P8hvv`;
    const response = await fetch(ipfsUrl);
    const document = await response.json(); // Assuming the document is in JSON format
    return document.dob; // Assuming the document contains an "age" field
};