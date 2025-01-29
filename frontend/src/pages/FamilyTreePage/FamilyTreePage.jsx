
import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import FamilyMemberCard from '../../components/FamilyTree/FamilyMemberCard';

import './FamilyTreePage.css';

const FamilyTreePage = () => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [members, setMembers] = useState([
        {
            id: 1,
            name: "You",
            type: "self",
            level: 0,
            position: { x: 400, y: 300 }
        }
    ]);

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

    const handleMemberDrag = (id, newPosition) => {
        setMembers(prevMembers =>
            prevMembers.map(member =>
                member.id === id
                    ? { ...member, position: newPosition }
                    : member
            )
        );
    };

    const handleAddMember = (newMember, parentId) => {
        setMembers(prev => [...prev, newMember]);
    };

    const handleDeleteMember = (memberId) => {
        setMembers(prev => prev.filter(m => m.id !== memberId));
    };

    const handleNameChange = (id, newName) => {
        setMembers(prevMembers =>
            prevMembers.map(member =>
                member.id === id
                    ? { ...member, name: newName }
                    : member
            )
        );
    };

    return (
        <div className="fixed inset-0 bg-gray-50 overflow-hidden">
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
                {/* Family Members */}
                {members.map(member => (
                    <FamilyMemberCard
                        key={member.id}
                        member={member}
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