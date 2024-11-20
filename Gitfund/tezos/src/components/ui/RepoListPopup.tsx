import { useEffect, useState } from 'react';

interface RepoListPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const RepoListPopup: React.FC<RepoListPopupProps> = ({ isOpen, onClose }) => {
    const [repos, setRepos] = useState<any[]>([]);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const response = await fetch('/api/auth/[...nextauth]');
                const data = await response.json();
                setAccessToken(data.accessToken);
            } catch (error) {
                console.error('Error fetching access token:', error);
            }
        };

        fetchAccessToken();
    }, []);

    useEffect(() => {
        const fetchRepos = async () => {
            if (accessToken) {
                try {
                    const response = await fetch('https://api.github.com/user/repos', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    const data = await response.json();
                    setRepos(data);
                } catch (error) {
                    console.error('Error fetching repositories:', error);
                }
            }
        };

        fetchRepos();
    }, [accessToken]);

    if (!isOpen) return null;

    return (
        <div className="popup">
            <button onClick={onClose}>Close</button>
            <ul>
                {repos.map((repo) => (
                    <li key={repo.id}>{repo.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default RepoListPopup;
