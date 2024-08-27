export const fetchModuleDetails = async (moduleId: string) => {
    try {
      const response = await fetch(`https://sk-hackers-path.onrender.com/api/v1/modules/${moduleId}`);
      const moduleData = await response.json();
      return moduleData;
    } catch (error) {
      console.error('Error fetching module details:', error);
      throw error;
    }
  };
  