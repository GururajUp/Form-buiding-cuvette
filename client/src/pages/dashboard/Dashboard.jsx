import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { FaFolderPlus } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { RiArrowDropDownLine, RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';
import styles from "./Dashboard.module.css";
import { getUserFolders, userDetails } from "../../api/User";
import { createFolder, deleteFolder } from "../../api/Folder";
import toast from 'react-hot-toast';

function Dashboard({ handleLogout }) {
  const { userId } = useParams();
  const [username, setUsername] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isCreateFolderVisible, setIsCreateFolderVisible] = useState(false);
  const [folderName, setFolderName] = useState("");
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (dropdownRef.current && buttonRef.current) {
        const buttonWidth = buttonRef.current.offsetWidth;
        dropdownRef.current.style.width = `${buttonWidth}px`;
      }
    };

    handleResize(); // Set initial width
    window.addEventListener('resize', handleResize); // Adjust on window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup
    };
  }, [buttonRef.current, isDropdownVisible]); // Recalculate width when dropdown visibility changes

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        if (userId) {
          const fetchedFolders = await getUserFolders(userId);
          setFolders(fetchedFolders);
        }
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFolders();
  }, [userId]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userId) {
          const response = await userDetails(userId);
          setUsername(response.userDetails);
        } else {
          toast.error('User ID not found');
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleCreateFolderClick = () => {
    setIsCreateFolderVisible(true);
  };

  const handleCreateFolder = async () => {
    try {
      if (folderName.trim()) {
        await createFolder(folderName, userId);
        setIsCreateFolderVisible(false);
        setFolderName("");
        toast.success('Folder created successfully!');
        const fetchedFolders = await getUserFolders(userId); // Refresh the folder list
        setFolders(fetchedFolders);
      } else {
        toast.error('Folder name cannot be empty');
      }
    } catch (error) {
      toast.error(`Error creating folder: ${error.message}`);
    }
  };

  const handleCancelCreateFolder = () => {
    setIsCreateFolderVisible(false);
    setFolderName("");
  };

  const handleDeleteFolder = async (folderId) => {
    try {
      await deleteFolder(folderId);
      toast.success('Folder deleted successfully!');
      const fetchedFolders = await getUserFolders(userId); // Refresh the folder list
      setFolders(fetchedFolders);
    } catch (error) {
      toast.error(`Error deleting folder: ${error.message}`);
    }
  };

  return (
    <div className={styles.maindiv}>
      <nav className={styles.navbar}>
        <div className={styles.userDropdown} onClick={toggleDropdown} ref={buttonRef}>
          <span>{username.username}'s workspace</span>
          <span><RiArrowDropDownLine size={"20px"} /></span>
        </div>
        {isDropdownVisible && (
          <div className={styles.dropdownMenu} ref={dropdownRef}>
            <div onClick={() => navigate('/settings')}>Settings</div>
            <div onClick={() => {
              handleLogout();
              navigate('/');
            }}>Log Out</div>
          </div>
        )}
      </nav>
      <div className={styles.navLine}></div>
      <div className={styles.content}>
        <div className={styles.divone}>
          <div className={styles.folderOption} onClick={handleCreateFolderClick}><FaFolderPlus /> Create a folder</div>
          {folders.map((folder) => (
            <div className={styles.folderList} key={folder._id}>
              <span>{folder.foldername}</span>
              <span onClick={() => handleDeleteFolder(folder._id)}><RiDeleteBin6Line color='#F55050' /></span>
            </div>
          ))}
        </div>
        <div className={styles.typeBotContainer}>
          <div onClick={() => navigate("/form")} className={styles.typeBotSquare}>
            <span><IoAdd size={"20px"} /></span>
            <span>Create a typeBot</span>
          </div>
          {isCreateFolderVisible && (
            <div className={styles.createFolderPopup}>
              <h3>Create New Folder</h3>
              <input
                type="text"
                placeholder="Enter folder name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
              <div className={styles.createFolderActions}>
                <button onClick={handleCreateFolder}>Done</button>
                <button onClick={handleCancelCreateFolder}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;