import React from 'react';

interface BountyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  bounty: any; // Replace 'any' with the actual type of bounty if known
}

const BountyPopup: React.FC<BountyPopupProps> = ({ isOpen, onClose, bounty }) => {
  if (!isOpen || !bounty) return null;

  return (
    <div className="popup">
      <button onClick={onClose}>Close</button>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" value={bounty.title} readOnly />
        </div>
        <div>
          <label>Repo Name:</label>
          <input type="text" value={bounty.repo} readOnly />
        </div>
        <div>
          <label>Repo Link:</label>
          <input type="text" value={`https://github.com/${bounty.repo}`} readOnly />
        </div>
        <div>
          <label>Issue:</label>
          <input type="text" value={bounty.issue} readOnly />
        </div>
        <div>
          <label>Reward:</label>
          <input type="text" value={bounty.reward} readOnly />
        </div>
        <div>
          <label>Status:</label>
          <input type="text" value={bounty.status} readOnly />
        </div>
      </form>
    </div>
  );
};

export default BountyPopup;
