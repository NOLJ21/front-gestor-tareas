import React from 'react';

const TaskList = ({
                      tasks,
                      filterValue,
                      onFilterChange,
                      onStatusChange,
                      onDelete,
                      onEdit,
                      searchTitle,
                      onTitleChange,
                      dateRange,
                      onDateChange,
                      onApplyFilters,
                      onClearFilters
                  }) => (
    <div>
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">Filtrar tareas</h5>
                <div className="row g-3">
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por título"
                            value={searchTitle}
                            onChange={(e) => onTitleChange(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="fw-bold" >Fecha de Inicio</label>
                        <input
                            type="date"
                            className="form-control"
                            value={dateRange.startDate}
                            onChange={(e) => onDateChange({...dateRange, startDate: e.target.value})}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="fw-bold">Fecha de Fin</label>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Fecha de fin"
                            value={dateRange.endDate}
                            onChange={(e) => onDateChange({ ...dateRange, endDate: e.target.value })}
                        />
                    </div>
                    <div className="col-md-3 d-flex gap-2">
                        <button className="btn btn-primary w-100" onClick={onApplyFilters}>
                            Aplicar
                        </button>
                        <button className="btn btn-outline-secondary w-100" onClick={onClearFilters}>
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Tareas</h4>
            <select
                className="form-select w-auto"
                value={filterValue}
                onChange={onFilterChange}
            >
                <option value="">Todas</option>
                <option value="pendiente">Pendiente</option>
                <option value="en progreso">En progreso</option>
                <option value="completada">Completada</option>
            </select>
        </div>

        {tasks.length === 0 ? (
            <div className="alert alert-info">No hay tareas para mostrar.</div>
        ) : (
            tasks.map(task => (
                <div className="card shadow-sm mb-3" key={task.id}>
                    <div className="card-body">
                        <h5 className="card-title">{task.title}</h5>
                        {task.description && <p className="card-text">{task.description}</p>}
                        <p className="mb-1">
                            <strong>Estado:</strong>&nbsp;
                            {task.status === 'completada' ? (
                                <span>{task.status}</span>
                            ) : (
                                <select
                                    className="form-select form-select-sm d-inline-block w-auto"
                                    value={task.status}
                                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                                >
                                    <option value="pendiente" disabled>pendiente</option>
                                    <option value="en progreso" disabled={task.status !== 'pendiente'}>
                                        en progreso
                                    </option>
                                    <option value="completada" disabled={task.status !== 'en progreso'}>
                                        completada
                                    </option>
                                </select>
                            )}
                        </p>
                        {task.dueDate && (
                            <p className="mb-1">
                                <strong>Fecha límite:</strong> {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                        )}
                        {task.status !== 'completada' && (
                            <button
                                className="btn btn-sm btn-outline-primary mt-2 me-2"
                                onClick={() => onEdit(task)}
                            >
                                Editar
                            </button>
                        )}
                        {task.status === 'completada' && (
                            <button
                                className="btn btn-sm btn-outline-danger mt-2"
                                onClick={() => onDelete(task.id)}
                            >
                                Eliminar
                            </button>
                        )}
                    </div>
                </div>
            ))
        )}
    </div>
);

export default TaskList;
