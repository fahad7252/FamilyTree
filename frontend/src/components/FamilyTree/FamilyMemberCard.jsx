
// components/FamilyTree/FamilyMemberCard/FamilyMemberCard.jsx
import React, { useState, useRef } from 'react';
import { User, Plus, X, Pencil } from 'lucide-react';
import './FamilyMemberCard.css';
import { useNavigate } from 'react-router-dom';

const FamilyMemberCard = ({ 
    member, 
    level, 
    scale, 
    position, 
    onDrag, 
    onAdd, 
    onDelete, 
    onNameChange 
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isEditing, setIsEditing] = useState(false);
    const cardRef = useRef(null);
    const navigate = useNavigate();

    const getCardStyle = (memberType, level) => {
        if (memberType === 'spouse') {
            return 'member-card spouse';
        }
        const levelClasses = {
            2: 'member-card level-2',
            1: 'member-card level-1',
            0: 'member-card level-0',
            '-1': 'member-card level-minus-1'
        };
        return levelClasses[level] || 'member-card';
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        onDrag(member._id, {
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleAdd = (type) => {
        const newPosition = {
            x: position.x + (type === 'sibling' ? 200 : 0),
            y: position.y + (type === 'child' ? 150 : type === 'parent' ? -150 : 0)
        };
        const newMember = {
            name: `New ${type}`,
            type: type,
            level: type === 'parent' ? level + 1 : type === 'child' ? level - 1 : level,
            position: newPosition
        };
        onAdd(newMember, member._id);
    };
    

    const cardClassName = `${getCardStyle(member.type, level)} ${isDragging ? 'dragging' : ''}`;

    return (
        <div
            ref={cardRef}
            className={cardClassName}
            style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: 'center center',
                width: '180px',
                zIndex: isDragging ? 10 : 1,
                transition: isDragging ? 'none' : 'transform 0.1s ease-in-out'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div className="card-content">
                <div className="level-indicator">
                    Level {level}
                </div>
                <div className="member-info">
                    <User className="user-icon" size={16} />
                    <div className="info-container">
                        {isEditing ? (
                            <input
                                type="text"
                                value={member.name}
                                onChange={(e) => onNameChange(member._id, e.target.value)}
                                onBlur={() => setIsEditing(false)}
                                autoFocus
                                className="name-input"
                            />
                        ) : (
                            <div className="name-container">
                                <div className="member-name">{member.name}</div>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="edit-button"
                                    title="Edit name"
                                >
                                    <Pencil size={12} />
                                </button>
                                <button
                                    onClick={() => navigate(`/members/${member._id}`)}
                                    className="details-button"
                                    title="View Details"
                                >
                                    <User size={12} />
                                </button>
                            </div>
                        )}
                        <div className="member-type">{member.type}</div>
                    </div>
                    <button
                        onClick={() => onDelete(member._id)}
                        className="delete-button"
                    >
                        <X size={14} />
                    </button>
                </div>
                
                <div className="action-buttons">
                    <button
                        onClick={() => handleAdd('parent')}
                        className="add-button parent"
                    >
                        + Parent
                    </button>
                    <button
                        onClick={() => handleAdd('sibling')}
                        className="add-button sibling"
                    >
                        + Sibling
                    </button>
                    <button
                        onClick={() => handleAdd('spouse')}
                        className="add-button spouse"
                    >
                        + Spouse
                    </button>
                    <button
                        onClick={() => handleAdd('child')}
                        className="add-button child"
                    >
                        + Child
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FamilyMemberCard;

