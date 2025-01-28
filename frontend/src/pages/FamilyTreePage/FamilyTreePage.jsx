

import React, { useState, useEffect } from 'react';
import { MousePointer, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import FamilyMemberCard from '../../components/FamilyTree/FamilyMemberCard';
import ConnectionLine from '../../components/FamilyTree/ConnectionLine';
import './FamilyTreePage.css';

const FamilyTreePage = () => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [isDrawMode, setIsDrawMode] = useState(false);
    const [connectFrom, setConnectFrom] = useState(null);
    const [tempLine, setTempLine] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [members, setMembers] = useState([
        {
            id: 1,
            name: "You",
            type: "self",
            level: 0,
            position: { x: 400, y: 300 }
        }
    ]);
    const [connections, setConnections] = useState([]);

    useEffect(() => {
        if (!isDrawMode) {
            setConnectFrom(null);
            setTempLine(null);
        }
    }, [isDrawMode]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });

        if (connectFrom && isDrawMode) {
            setTempLine({
                start: {
                    x: connectFrom.position.x,
                    y: connectFrom.position.y
                },
                end: { x, y }
            });
        }

        if (isDragging) {
            const newX = e.clientX - startPosition.x;
            const newY = e.clientY - startPosition.y;
            setPosition({ x: newX, y: newY });
        }
    };

    const handleMouseDown = (e) => {
        if (e.target === e.currentTarget) {
            setIsDragging(true);
            setStartPosition({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleCardClick = (member) => {
        if (!isDrawMode) return;

        if (!connectFrom) {
            setConnectFrom({
                id: member.id,
                position: {
                    x: member.position.x + 90,
                    y: member.position.y + 40
                }
            });
        } else if (connectFrom.id !== member.id) {
            const newConnection = {
                from: connectFrom.id,
                to: member.id
            };

            const connectionExists = connections.some(
                conn => (conn.from === newConnection.from && conn.to === newConnection.to) ||
                    (conn.from === newConnection.to && conn.to === newConnection.from)
            );

            if (!connectionExists) {
                setConnections(prev => [...prev, newConnection]);
            }

            setConnectFrom(null);
            setTempLine(null);
        }
    };

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget && isDrawMode) {
            setConnectFrom(null);
            setTempLine(null);
        }
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
        if (parentId) {
            setConnections(prev => [...prev, {
                from: parentId,
                to: newMember.id
            }]);
        }
    };

    const handleDeleteMember = (memberId) => {
        setMembers(prev => prev.filter(m => m.id !== memberId));
        setConnections(prev =>
            prev.filter(conn => conn.from !== memberId && conn.to !== memberId)
        );
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
                    onClick={() => setIsDrawMode(!isDrawMode)}
                    className={`p-2 rounded-full ${isDrawMode ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    title={isDrawMode ? "Exit Draw Mode" : "Enter Draw Mode"}
                >
                    <MousePointer size={20} />
                </button>
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
                className={`absolute min-w-full min-h-full ${isDrawMode ? 'cursor-crosshair' : 'cursor-move'}`}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: isDragging ? 'none' : 'transform 0.1s'
                }}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={handleBackgroundClick}
            >
                {/* Connection Lines */}
{connections.map((connection, index) => {
    
    const fromMember = members.find(m => m.id === connection.from);
    const toMember = members.find(m => m.id === connection.to);
    if (!fromMember || !toMember) {
        console.log("Missing members for connection:", {fromMember, toMember}); 
        return null;
    }

    return (
        <ConnectionLine
            key={index}
            start={{
                x: fromMember.position.x,
                y: fromMember.position.y
            }}
            end={{
                x: toMember.position.x,
                y: toMember.position.y
            }}
        />
    );
})}
                   

                {/* Temporary Drawing Line */}
                {tempLine && isDrawMode && (
                    <ConnectionLine
                        start={tempLine.start}
                        end={tempLine.end}
                        isDashed={true}
                    />
                )}

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
                        onClick={() => handleCardClick(member)}
                        isSelected={connectFrom?.id === member.id}
                        isDrawMode={isDrawMode}
                    />
                ))}
            </div>
        </div>
    );
};

export default FamilyTreePage;