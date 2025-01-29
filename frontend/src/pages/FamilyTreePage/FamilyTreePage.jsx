
// pages/FamilyTreePage/FamilyTreePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import FamilyMemberCard from '../../components/FamilyTree/FamilyMemberCard';
import { getToken } from '../../services/authService';
import * as familyTreeService from '../../services/familyTreeService';
import { debounce } from 'lodash';
import './FamilyTreePage.css';

const FamilyTreePage = () => {
    const navigate = useNavigate();
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [members, setMembers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate('/login');
            return;
        }

        async function loadMembers() {
            try {
                const data = await familyTreeService.getFamilyMembers();
                if (!data || data.length === 0) {
                    const initialMember = {
                        name: "You",
                        type: "self",
                        level: 0,
                        position: { x: 400, y: 300 }
                    };
                    try {
                        const createdMember = await familyTreeService.addFamilyMember(initialMember);
                        setMembers([createdMember]);
                    } catch (err) {
                        console.log('Error creating initial member:', err);
                        setMembers([{ ...initialMember, _id: Date.now().toString() }]);
                    }
                } else {
                    setMembers(data);
                }
            } catch (err) {
                console.log('Error loading members:', err);
                if (err.message === 'Please Log In') {
                    navigate('/login');
                }
            }
        }
        loadMembers();
    }, [navigate]);

    const handleMouseDown = (e) => {
        if (e.target === e.currentTarget) {
            setIsDragging(true);
            setStartPosition({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - startPosition.x,
            y: e.clientY - startPosition.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const debouncedUpdatePosition = debounce(async (id, newPosition) => {
        try {
            await familyTreeService.updateMemberPosition(id, newPosition);
        } catch (err) {
            console.error('Error updating position:', err);
        }
    }, 300);

    const handleMemberDrag = (id, newPosition) => {
        setMembers(prevMembers =>
            prevMembers.map(member =>
                member._id === id ? { ...member, position: newPosition } : member
            )
        );
        debouncedUpdatePosition(id, newPosition);
    };

    const handleAddMember = async (newMember, parentId) => {
        try {
            const createdMember = await familyTreeService.addFamilyMember(newMember);
            setMembers(prev => [...prev, createdMember]);
        } catch (err) {
            console.error('Error adding member:', err);
            setError('Failed to add new member');
        }
    };

    const handleDeleteMember = async (memberId) => {
        try {
            await familyTreeService.deleteFamilyMember(memberId);
            setMembers(prev => prev.filter(m => m._id !== memberId));
        } catch (err) {
            console.error('Error deleting member:', err);
            setError('Failed to delete member');
        }
    };

    const handleNameChange = async (id, newName) => {
        try {
            await familyTreeService.updateFamilyMember(id, { name: newName });
            setMembers(prevMembers =>
                prevMembers.map(member =>
                    member._id === id ? { ...member, name: newName } : member
                )
            );
        } catch (err) {
            console.error('Error updating name:', err);
            setError('Failed to update name');
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className="fixed inset-0 bg-gray-50 overflow-hidden">
            {error && (
                <div className="fixed top-16 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
                    {error}
                </div>
            )}

            {/* Controls */}
            <div className="fixed top-4 right-4 flex gap-2 bg-white p-2 rounded-lg shadow-lg z-50">
                <button 
                    onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <ZoomOut size={20} />
                </button>
                <button 
                    onClick={() => {
                        setScale(1);
                        setPosition({ x: 0, y: 0 });
                    }} 
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <RotateCcw size={20} />
                </button>
                <button 
                    onClick={() => setScale(prev => Math.min(prev + 0.1, 2))}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <ZoomIn size={20} />
                </button>
            </div>

            {/* Title */}
            <div className="fixed top-4 left-4 bg-white p-2 rounded-lg shadow-lg z-50">
                <h2 className="text-2xl font-bold">Family Tree</h2>
            </div>

            {/* Tree Container */}
            <div
                className="absolute min-w-full min-h-full cursor-move"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: isDragging ? 'none' : 'transform 0.1s'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {members.map(member => (
                    <FamilyMemberCard
                key={member._id}       // Use member._id as the key
                member={member}         // Pass the original member object
                level={member.level}
                scale={scale}
                position={member.position}
                onDrag={handleMemberDrag}
                onAdd={handleAddMember}
                onDelete={handleDeleteMember}
                onNameChange={handleNameChange}
                    />
                ))}
            </div>
        </div>
    );
};

export default FamilyTreePage;
