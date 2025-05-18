import React from 'react';

const EditTaskModal = ({ show, task, form, onClose, onChange, onSubmit }) => {
    if (!show) return null;

    return (
        <div className="modal show fade d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Tarea</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Título"
                            value={form.title}
                            onChange={(e) => onChange({ ...form, title: e.target.value })}
                            required
                        />
                        <textarea
                            className="form-control mb-2"
                            placeholder="Descripción"
                            value={form.description}
                            onChange={(e) => onChange({ ...form, description: e.target.value })}
                        />
                        <input
                            type="date"
                            className="form-control mb-2"
                            value={form.dueDate}
                            onChange={(e) => onChange({ ...form, dueDate: e.target.value })}
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button className="btn btn-success" onClick={onSubmit}>
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTaskModal;
