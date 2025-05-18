import React from 'react';

const today = new Date().toISOString().split('T')[0];

const NewTaskForm = ({ task, onChange, onSubmit, error }) => (
    <div className="card shadow-sm mb-4">
        <div className="card-body">
            <h4 className="card-title">Nueva tarea</h4>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Título"
                value={task.title}
                onChange={(e) => onChange({ ...task, title: e.target.value })}
                required
            />
            <textarea
                className="form-control mb-2"
                placeholder="Descripción (opcional)"
                value={task.description}
                onChange={(e) => onChange({ ...task, description: e.target.value })}
            />
            <input
                type="date"
                className="form-control mb-3"
                value={task.dueDate}
                min={today}
                onChange={(e) => onChange({ ...task, dueDate: e.target.value })}
            />
            {error && <div className="text-danger mb-2">{error}</div>}
            <button className="btn btn-primary w-100" onClick={onSubmit}>
                Crear Tarea
            </button>
        </div>
    </div>
);

export default NewTaskForm;
