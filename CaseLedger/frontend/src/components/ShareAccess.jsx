import React, { useState, useEffect } from 'react';
import './global.js';

const ShareAccess = ({ state, selectedCaseID, onClose }) => {
    const { account, contract } = state;
    const [recipientAddress, setRecipientAddress] = useState('');
    const [accessList, setAccessList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchAccessList();
    }, [selectedCaseID]);

    const fetchAccessList = async () => {
        try {
            const accessList = await contract.getUsersWithAccess(selectedCaseID);
            setAccessList(accessList);
            console.log('Access List:', accessList);
        } catch (error) {
            console.error('Error fetching access list:', error);
            setAccessList([]);
        }
    };

    const handleShareAccess = async () => {
        setIsLoading(true);
        try {
            await contract.allowAccess(recipientAddress, selectedCaseID);
            alert('Access shared successfully');
            const logData = {
                address: account,
                caseName: selectedCaseID,
                event: 'Allow Access',
                timestamp: new Date().toISOString(),
                result: 'success',
            };
            await sendLogToServer(logData);
            onClose();
        } catch (error) {
            console.error('Error sharing access:', error);
            alert('Error sharing access. Please try again.');
            const logData = {
                address: account,
                caseName: selectedCaseID,
                event: 'Allow Access',
                timestamp: new Date().toISOString(),
                result: 'failed',
            };
            await sendLogToServer(logData);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRevokeAccess = async (userAddress) => {
        setIsLoading(true);
        try {
            await contract.disallowAccess(userAddress, selectedCaseID);
            alert('Access revoked successfully');
            const logData = {
                address: account,
                caseName: selectedCaseID,
                event: 'Revoke Access',
                timestamp: new Date().toISOString(),
                result: 'success',
            };
            await sendLogToServer(logData);
            onClose();
        } catch (error) {
            console.error('Error revoking access:', error);
            alert('Error revoking access. Please try again.');
            const logData = {
                address: account,
                caseName: selectedCaseID,
                event: 'Revoke Access',
                timestamp: new Date().toISOString(),
                result: 'failed',
            };
            await sendLogToServer(logData);
        } finally {
            setIsLoading(false);
        }
    };

    const sendLogToServer = async (logData) => {
        try {
            console.log('Log Data:', logData);
            const response = await fetch('http://192.168.0.110:5000/logs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logData)
            });
            const data = await response.json();
            console.log('Log sent successfully:', data);
        } catch (error) {
            console.error('Error sending log:', error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white w-[50%] p-8 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Manage Access</h2>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Users with Access:</h3>
                    <ul>
                        {accessList.map((access, index) => (
                            <li key={index} className="flex justify-between">
                                <span>{access}</span>
                                <button
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                    onClick={() => handleRevokeAccess(access)}
                                    disabled={isLoading}
                                >
                                    Revoke
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-4">
                    <label htmlFor="recipientAddress" className="block mb-2 text-sm font-medium text-gray-700">
                        Recipient Address
                    </label>
                    <input
                        type="text"
                        id="recipientAddress"
                        className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                        placeholder="Enter recipient address"
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        onClick={handleShareAccess}
                        disabled={!recipientAddress || isLoading}
                    >
                        {isLoading ? 'Sharing...' : 'Share Access'}
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareAccess;
