import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import EditTaskModal from "../EditTask/EditTaskModal";
import TaskList from "../TaskList/TaskList";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import {toast, ToastContainer} from 'react-toastify';

const Dashboard = () => {
    const urlBack = `${process.env.REACT_APP_API_URL}`;
    const user = JSON.parse(localStorage.getItem('user'));
    const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        dueDate: ''
    });

    const [searchTitle, setSearchTitle] = useState('');
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });


    const [createError, setCreateError] = useState('');

    const [editingTask, setEditingTask] = useState(null);
    const [editForm, setEditForm] = useState({
        title: '',
        description: '',
        dueDate: ''
    });



    const token = localStorage.getItem('token');

    const fetchTasks = async () => {
        try {
            let url = `${urlBack}/api/tasks`;
            if (statusFilter) url += `?status=${statusFilter}`;

            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setTasks(res.data.length > 0 ? res.data : []);
        } catch (err) {
            toast.error('Error al cargar tareas');
            setTasks([]);
        }
    };


    useEffect(() => {
        if (token) fetchTasks();
    }, [statusFilter, token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const handleFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };
    const handleCreateTask = async () => {
        setCreateError('');
        if (!newTask.title.trim()) {
            setCreateError('El título es obligatorio');
            return;
        }

        try {
            await axios.post(`${urlBack}/api/tasks`, newTask, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setNewTask({title: '', description: '', dueDate: ''});
            toast.success('Tarea creada');
            fetchTasks(); // limpia filtro y recarga todas
        } catch (err) {
            toast.error('Error al crear tarea');
            const msg = err.response?.data?.message || 'Error al crear tarea';
            setCreateError(msg);
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await axios.put(
                `${urlBack}/api/tasks/${taskId}/status`,
                {status: newStatus},
                {headers: {Authorization: `Bearer ${token}`}}
            );
            toast.success('Tarea actualizada');
            // Refrescar tareas
            fetchTasks();
        } catch (err) {
            toast.error('Error al cambiar estado');
            alert(err.response?.data?.message || 'Error al cambiar estado');
        }
    };

    const handleDeleteTask = async (taskId) => {
        const confirm = window.confirm('¿Estás seguro de que quieres eliminar esta tarea?');
        if (!confirm) return;

        try {
            await axios.delete(`${urlBack}/api/tasks/${taskId}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            toast.success('Tarea eliminada');
            // Forzar recarga
            fetchTasks();
        } catch (err) {
            toast.error('Error al eliminar tarea');
            alert(err.response?.data?.message || 'Error al eliminar la tarea');
        }
    };

    const openEditModal = (task) => {
        setEditingTask(task);
        setEditForm({
            title: task.title,
            description: task.description || '',
            dueDate: task.dueDate ? task.dueDate.slice(0, 10) : ''
        });
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(
                `http://${urlBack}/api/tasks/${editingTask.id}`,
                editForm,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setEditingTask(null);
            toast.success('Tarea actualizada');
            fetchTasks();
        } catch (err) {
            toast.error('Error al editar tarea');
            alert(err.response?.data?.message || 'Error al editar tarea');
        }
    };

    const handleApplyFilters = async () => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            let url = '';

            if (searchTitle.trim() !== '') {
                url = `${urlBack}/api/tasks/by-title?title=${searchTitle}`;
            } else if (dateRange.startDate && dateRange.endDate) {
                url = `${urlBack}/api/tasks/by-date?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
            }

            if (url) {
                const res = await axios.get(url, { headers });
                setTasks(res.data.length > 0 ? res.data : []);
            } else {
                fetchTasks();
            }
        } catch (err) {
            toast.error('Error al aplicar filtros');
            setTasks([]); // ← Limpiar la lista en caso de error
        }
    };


    const handleClearFilters = () => {
        setSearchTitle('');
        setDateRange({ startDate: '', endDate: '' });
        fetchTasks();
    };



    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Bienvenido, {user?.name}</h2>
                <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
            </div>
            <p><strong>Email:</strong> {user?.email}</p>
            <div className="row mt-4">

                <div className="col-md-5">
                    <NewTaskForm
                        task={newTask}
                        onChange={setNewTask}
                        onSubmit={handleCreateTask}
                        error={createError}
                    />
                </div>

                <div className="col-md-7">
                    <TaskList
                        tasks={tasks}
                        filterValue={statusFilter}
                        onFilterChange={handleFilterChange}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDeleteTask}
                        onEdit={openEditModal}
                        searchTitle={searchTitle}
                        onTitleChange={setSearchTitle}
                        dateRange={dateRange}
                        onDateChange={setDateRange}
                        onApplyFilters={handleApplyFilters}
                        onClearFilters={handleClearFilters}
                    />
                </div>
            </div>
            <EditTaskModal
                show={!!editingTask}
                task={editingTask}
                form={editForm}
                onClose={() => setEditingTask(null)}
                onChange={setEditForm}
                onSubmit={handleEditSubmit}
            />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default Dashboard;

