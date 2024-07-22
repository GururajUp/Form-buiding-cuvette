import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiTextT } from "react-icons/pi";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineGif } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { MdAlternateEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { TbMovie } from "react-icons/tb";
import { LuCheckSquare } from "react-icons/lu";
import styles from './FormPage.module.css';
import { saveForm } from '../../api/Form';
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from 'react-hot-toast';

const FormPage = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState("");
  const [errors, setErrors] = useState({});
  const [folderId, setFolderId] = useState(null);
  const [bubbleCounts, setBubbleCounts] = useState({
    Text: { max: 0, available: new Set() },
    Image: { max: 0, available: new Set() },
    Video: { max: 0, available: new Set() },
    GIF: { max: 0, available: new Set() },
  });
  const [inputCounts, setInputCounts] = useState({
    Text: { max: 0, available: new Set() },
    Number: { max: 0, available: new Set() },
    Email: { max: 0, available: new Set() },
    Phone: { max: 0, available: new Set() },
    Date: { max: 0, available: new Set() },
    Rating: { max: 0, available: new Set() },
    Buttons: { max: 0, available: new Set() },
  });

  useEffect(() => {
    const fetchFolderId = async () => {
      try {
        const response = await axios.get('http://localhost:3000/folder/getfolderid');
        setFolderId(response.data.folderId || null);
      } catch (error) {
        console.error("Error fetching folder ID", error);
      }
    };

    fetchFolderId();
  }, []);

  const bubbles = [
    { name: 'Text', icon: <LuMessageSquare size={"20px"} color='#4B83FF' /> },
    { name: 'Image', icon: <CiImageOn size={"20px"} color='#4B83FF' /> },
    { name: 'Video', icon: <TbMovie size={"20px"} color='#4B83FF' /> },
    { name: 'GIF', icon: <MdOutlineGif size={"25px"} color='#4B83FF' /> }
  ];

  const inputs = [
    { name: 'Text', icon: <PiTextT size={"20px"} color='#FFA54C' /> },
    { name: 'Number', icon: <FaHashtag size={"18px"} color='#FFA54C' /> },
    { name: 'Email', icon: <MdAlternateEmail size={"20px"} color='#FFA54C' /> },
    { name: 'Phone', icon: <FiPhone size={"18px"} color='#FFA54C' /> },
    { name: 'Date', icon: <CiCalendar size={"20px"} color='#FFA54C' /> },
    { name: 'Rating', icon: <CiStar size={"20px"} color='#FFA54C' /> },
    { name: 'Buttons', icon: <LuCheckSquare size={"20px"} color='#FFA54C' /> }
  ];

  const handleBubbleClick = (type) => {
    setBubbleCounts(prevCounts => {
      const newCount = prevCounts[type].available.size > 0
        ? Math.min(...prevCounts[type].available)
        : prevCounts[type].max + 1;

      const newAvailable = new Set(prevCounts[type].available);
      newAvailable.delete(newCount);

      setFields(prevFields => [
        ...prevFields,
        { type, heading: `${type} ${newCount}` }
      ]);

      return {
        ...prevCounts,
        [type]: {
          max: Math.max(prevCounts[type].max, newCount),
          available: newAvailable
        }
      };
    });
  };

  const handleInputClick = (type) => {
    setInputCounts(prevCounts => {
      const newCount = prevCounts[type].available.size > 0
        ? Math.min(...prevCounts[type].available)
        : prevCounts[type].max + 1;

      const newAvailable = new Set(prevCounts[type].available);
      newAvailable.delete(newCount);

      setFields(prevFields => [
        ...prevFields,
        { type, heading: `Input ${type} ${newCount}` }
      ]);

      return {
        ...prevCounts,
        [type]: {
          max: Math.max(prevCounts[type].max, newCount),
          available: newAvailable
        }
      };
    });
  };

  const handleChange = (index, value) => {
    setFields(prevFields => {
      const updatedFields = [...prevFields];
      updatedFields[index].value = value;
      return updatedFields;
    });
  };

  const handleDelete = (index, type, isBubble) => {
    const countSet = isBubble ? setBubbleCounts : setInputCounts;

    setFields(prevFields => {
      const updatedFields = [...prevFields];
      const removedField = updatedFields.splice(index, 1)[0];

      countSet(prevCounts => {
        const newAvailable = new Set(prevCounts[removedField.type].available);
        const fieldNumber = parseInt(removedField.heading.split(' ').pop(), 10);
        newAvailable.add(fieldNumber);

        return {
          ...prevCounts,
          [removedField.type]: {
            ...prevCounts[removedField.type],
            available: newAvailable
          }
        };
      });

      return updatedFields;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    fields.forEach((field, index) => {
      if (!field.value) {
        newErrors[index] = 'This field is required';
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const formDetails = {
          formname: formName,
          folderId,
          theme: "default",
          fields,
        };

        const response = await saveForm(formDetails);
        console.log("Form saved successfully", response);
        toast.success("Form saved successfully");
      } catch (error) {
        console.error("Error saving form", error.message);
        toast.error(`Error saving form: ${error.message}`);
      }
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
        <div className={styles.centerButtons}>
          <button className={styles.tabButton}>Flow</button>
          <button onClick={() => navigate("/theme")} className={styles.tabButton}>Theme</button>
          <button onClick={() => navigate("/response")} className={styles.tabButton}>Response</button>
        </div>
        <div className={styles.rightButtons}>
          <button className={styles.actionButton}>Share</button>
          <button className={styles.saveButton} onClick={handleSubmit}>Save</button>
          <button className={styles.closeButton}>X</button>
        </div>
      </nav>
      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <div className={styles.section}>
            <h3>Bubbles</h3>
            <div className={styles.buttonGroup}>
              {bubbles.map((bubble, index) => (
                <button
                  key={index}
                  className={styles.bubbleButton}
                  onClick={() => handleBubbleClick(bubble.name)}
                >
                  <span>{bubble.icon}</span>
                  <span>{bubble.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <h3>Inputs</h3>
            <div className={styles.buttonGroup}>
              {inputs.map((input, index) => (
                <button
                  key={index}
                  className={styles.inputButton}
                  onClick={() => handleInputClick(input.name)}
                >
                  <span>{input.icon}</span>
                  <span>{input.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.fieldsContainer}>
          {fields.map((field, index) => (
            <div key={index} className={styles.formField}>
              <div className={styles.fieldHeader}>
                <label>{field.heading}</label>
                <RiDeleteBin6Line 
                  size={"20px"}
                  color='#f55050'
                  className={styles.deleteIcon}
                  onClick={() => handleDelete(index, field.type, field.heading.includes("Input"))}
                />
              </div>
              <input
                type="text"
                value={field.value || ''}
                onChange={(e) => handleChange(index, e.target.value)}
                className={errors[index] ? styles.errorInput : ''}
              />
              {errors[index] && <span className={styles.errorMessage}>{errors[index]}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormPage;