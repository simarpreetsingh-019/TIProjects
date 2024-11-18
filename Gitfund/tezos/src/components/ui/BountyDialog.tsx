import React from 'react';
import { CreateBountyForm } from "@/components/create-bounty-form";

interface BountyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bounty: any; // Replace 'any' with the actual type of bounty if known
}

const BountyDialog: React.FC<BountyDialogProps> = ({ isOpen, onClose, bounty }) => {
    if (!isOpen || !bounty) return null;

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="fixed  inset-0 bg-black  opacity-50" onClick={onClose}></div>
            <div className="bg-white  dark:bg-[#0f0f0f] rounded-lg p-6 z-10 relative max-h-[80vh] my-20  mx-auto flex justify-center">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={onClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <CreateBountyForm/>
            </div>
        </div>
    );
};

export default BountyDialog;
