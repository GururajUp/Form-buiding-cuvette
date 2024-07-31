import React, { useState, useEffect } from "react";
import Navbar2 from "../../components/navbar2/Navbar2";
import ThemeLeft from "./ThemeLeft";
import ThemeFront from "./ThemeFront";
import styles from "./Theme.module.css";
import { useParams } from "react-router-dom";
import { updateFormTheme, fetchFormById } from '../../api/Form';
import toast from 'react-hot-toast';

const Theme = () => {
  const { formId } = useParams();
  const [selectedTheme, setSelectedTheme] = useState("");
  const [formDetails, setFormDetails] = useState({});

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        console.log(`Fetching form details for formId: ${formId}`);
        const response = await fetchFormById(formId);
        console.log('Form details fetched:', response.form);
        setFormDetails(response.form);
        setSelectedTheme(response.form.theme);
      } catch (error) {
        console.error("Error fetching form details", error);
        toast.error("Error fetching form details");
      }
    };

    fetchFormDetails();
  }, [formId]);

  const handleThemeChange = async (theme) => {
    setSelectedTheme(theme);
    try {
      console.log(`Updating theme for formId: ${formId} to ${theme}`);
      await updateFormTheme(formId, theme);
      toast.success("Theme updated successfully");
    } catch (error) {
      console.error("Error updating theme", error.message);
      toast.error(`Error updating theme: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar2 currentPage="theme" />
      <div className={styles.main}>
        <ThemeLeft onThemeChange={handleThemeChange} />
        <ThemeFront selectedTheme={selectedTheme} />
      </div>
    </div>
  );
};

export default Theme;