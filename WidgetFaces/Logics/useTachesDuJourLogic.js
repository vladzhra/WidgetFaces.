import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useTachesDuJourLogic = () => {
    const [task, setTask] = useState('');
    const [tasksList, setTasksList] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const storedTasks = await AsyncStorage.getItem('tasks');
                if (storedTasks) {
                    const parsedTasks = JSON.parse(storedTasks);
                    const freshTasks = parsedTasks.filter(task => Date.now() - task.timestamp < 24 * 60 * 60 * 1000);
                    setTasksList(freshTasks);
                }
            } catch (error) {
                console.error("Failed to fetch tasks from storage:", error);
            }
        };
        fetchTasks();
    }, []);

    useEffect(() => {
        const storeTasks = async () => {
            try {
                await AsyncStorage.setItem('tasks', JSON.stringify(tasksList));
            } catch (error) {
                console.error("Failed to store tasks:", error);
            }
        };

        storeTasks();
    }, [tasksList]);

    const handleAddTask = () => {
        if (task.trim()) {
            const newTask = {
                text: task.trim(),
                timestamp: Date.now(),
            };
            setTasksList([...tasksList, newTask]);
            setTask('');
        }
    };

    const handleDeleteTask = (index) => {
        const updatedTasksList = [...tasksList];
        updatedTasksList.splice(index, 1);
        setTasksList(updatedTasksList);
    };


    return {
        task,
        setTask,
        tasksList,
        handleAddTask,
        handleDeleteTask,
    };
};

export default useTachesDuJourLogic;
