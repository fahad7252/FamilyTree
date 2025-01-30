import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as familyTreeService from '../../services/familyTreeService';
import './MemberDetailsPage.css';

const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

const MemberDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        async function loadMember() {
            try {
                const members = await familyTreeService.getFamilyMembers();
                const foundMember = members.find(m => m._id === id);
                if (foundMember) {
                    setMember(foundMember);
                }
            } catch (err) {
                console.error('Error loading member:', err);
            }
        }
        loadMember();
    }, [id]);

    const handleSave = async () => {
        try {
            const details = {
                birthDate: member.details?.birthDate || '',
                birthPlace: member.details?.birthPlace || '',
                occupation: member.details?.occupation || '',
                address: member.details?.address || '',
                contact: member.details?.contact || '',
                notes: member.details?.notes || ''
            };

            await familyTreeService.updateMemberDetails(id, details);
            setIsEditing(false);
        } catch (err) {
            console.error('Error saving member:', err);
        }
    };

    if (!member) {
        return <div>Loading...</div>;
    }

    return (
        <div className="member-details-page">
            <div className="header">
                <button onClick={() => navigate(-1)} className="back-button">
                    Back 
                </button>
                <h1>{member.name}'s Details</h1>
                <button 
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="edit-button"
                >
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>

            <div className="details-content">
                <div className="detail-section">
                    <h2>Basic Information</h2>
                    <div className="detail-grid">
                        <div className="detail-item">
                            <label>Full Name</label>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    value={member.name || ''}
                                    onChange={(e) => setMember({...member, name: e.target.value})}
                                />
                            ) : (
                                <span>{member.name}</span>
                            )}
                        </div>
                        <div className="detail-item">
                            <label>Relationship Type</label>
                            <span>{member.type}</span>
                        </div>
                        <div className="detail-item">
                            <label>Birth Date</label>
                            {isEditing ? (
                                <input 
                                    type="date" 
                                    value={formatDateForInput(member.details?.birthDate)}
                                    onChange={(e) => setMember({
                                        ...member, 
                                        details: {...member.details, birthDate: e.target.value}
                                    })}
                                />
                            ) : (
                                <span>{member.details?.birthDate ? new Date(member.details.birthDate).toLocaleDateString() : ''}</span>
                            )}
                        </div>
                        <div className="detail-item">
                            <label>Birth Place</label>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    value={member.details?.birthPlace || ''}
                                    onChange={(e) => setMember({
                                        ...member, 
                                        details: {...member.details, birthPlace: e.target.value}
                                    })}
                                />
                            ) : (
                                <span>{member.details?.birthPlace || ''}</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="detail-section">
                    <h2>Contact Information</h2>
                    <div className="detail-grid">
                        <div className="detail-item">
                            <label>Occupation</label>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    value={member.details?.occupation || ''}
                                    onChange={(e) => setMember({
                                        ...member, 
                                        details: {...member.details, occupation: e.target.value}
                                    })}
                                />
                            ) : (
                                <span>{member.details?.occupation || ''}</span>
                            )}
                        </div>
                        <div className="detail-item">
                            <label>Address</label>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    value={member.details?.address || ''}
                                    onChange={(e) => setMember({
                                        ...member, 
                                        details: {...member.details, address: e.target.value}
                                    })}
                                />
                            ) : (
                                <span>{member.details?.address || ''}</span>
                            )}
                        </div>
                        <div className="detail-item">
                            <label>Contact</label>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    value={member.details?.contact || ''}
                                    onChange={(e) => setMember({
                                        ...member, 
                                        details: {...member.details, contact: e.target.value}
                                    })}
                                />
                            ) : (
                                <span>{member.details?.contact || ''}</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="detail-section">
                    <h2>Notes</h2>
                    {isEditing ? (
                        <textarea 
                            value={member.details?.notes || ''}
                            onChange={(e) => setMember({
                                ...member, 
                                details: {...member.details, notes: e.target.value}
                            })}
                            rows={4}
                            className="w-full p-2 border rounded"
                        />
                    ) : (
                        <p>{member.details?.notes || ''}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemberDetailsPage;