import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MindfileBlock from '../components/MindfileBlock';
import MindfileDetails from '../components/MindfileDetails';
import FloatingActionButton from '../components/FloatingActionButton';
import CreateMindfileDialog from '../components/CreateMindfile';
import EmptyState from '../components/EmptyState';
import * as api from '../api';
import './DashBoardPage.css';

function DashboardPage() {
    const navigate = useNavigate();
    const [mindfiles, setMindfiles] = useState([]);
    const [selectedMindfileId, setSelectedMindfileId] = useState(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const fetchLatest = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.fetchLatestMindfiles();
            setMindfiles(data || []);
        } catch (err) {
            setError(err.message || "Failed to fetch lastest minfiles.");
            setMindfiles([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchLatest();
    }, []);

    const handleGoBackToLanding = () => {
        fetchLatest();
    };

    const handleSearch = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const results = await api.searchMindfiles(query);
            setMindfiles(results);
        } catch (err) {
            setError(err.message || "Failed to perform search");
        } finally {
            setLoading(false);
        }
    }

    const handleMindfileClick = (_id) => {
        setSelectedMindfileId(_id);
    };

    const handleCreateButtonClick = () => {
        setIsCreateDialogOpen(true);
    };

    const handleCreateDialogClose = () => {
        setIsCreateDialogOpen(false);
    };

    const handleSaveNewMindfile = async (link) => {
        console.log("Link to summarize and save:", link);
        setIsCreateDialogOpen(false); //closing window
        setLoading(true);
        setError(null);
        try {
            const response = await api.summarizeAndStoreLink(link);
            if (response && response.title) {
                setSuccessMessage(`"${response.title}" mindfile has been added.`);
                fetchLatest();
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }
        } catch (err) {
            setError(err.message || 'Failed to summarize and store link.');
        } finally {
            setLoading(false);
        }

        setIsCreateDialogOpen(false);
    };

    console.log(typeof mindfiles)
    const selectedMindfile = Array.isArray(mindfiles)
        ? mindfiles.find(mf => mf._id === selectedMindfileId)
        : null;

    return (
        <div className='dashboardContainer'>
            <button onClick={handleGoBackToLanding} className='backToLandingButton'>
                &larr; Back
            </button>
            <button onClick={handleLogout} className="logoutButton">
                Logout
            </button>
            <SearchBar onSearch={handleSearch} />
            {loading && <p>Loading latest mindfiles...</p>}
            {error && <p className='error'>Error: {error}</p>}
            {successMessage && <p className='success-message'>{successMessage}</p>}
            {loading && isCreateDialogOpen && <p>Summarizing and adding mindfile...</p>}

            {!loading && !error && mindfiles.length === 0 && <EmptyState />}
            {!loading && !error && mindfiles.length > 0 && (
                <div className="mindfileGrid">
                    {mindfiles.map(mindfile => (
                        <MindfileBlock
                            key={mindfile._id}
                            mindfile={mindfile}
                            onMindfileClick={handleMindfileClick}
                        />
                    ))}
                </div>
            )}

            <FloatingActionButton onClick={handleCreateButtonClick} />

            <CreateMindfileDialog
                isOpen={isCreateDialogOpen}
                onClose={handleCreateDialogClose}
                onSave={handleSaveNewMindfile}
            />

            {selectedMindfile && (
                <MindfileDetails mindfile={selectedMindfile} onClose={() => setSelectedMindfileId(null)} />
            )}
        </div>
    )

}
export default DashboardPage;