import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    getModules,
    createModule,
    updateModule,
    deleteModule
} from "../services/modules.service";

export default function Modules() {

    const [list, setList] = useState([]);
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [viewData, setViewData] = useState(null); // 👁️ view mode

    const { register, handleSubmit, reset } = useForm({
        defaultValues: { name: "" }
    });

    const fetchData = async () => {
        const data = await getModules();
        setList(data);
    };

    useEffect(() => { fetchData(); }, []);

    const isView = Boolean(viewData);

    const onSubmit = async (values) => {
        if (isView) return; // 🚫 block submit in view mode

        const payload = { name: values.name };

        editId
            ? await updateModule(editId, payload)
            : await createModule(payload);

        reset();
        setEditId(null);
        setShowForm(false);
        fetchData();
    };

    const handleEdit = (row) => {
        setEditId(row.id);
        setViewData(null);
        setShowForm(true);
        reset({ name: row.name });
    };

    const handleView = (row) => {
        setViewData(row);
        setEditId(null);
        setShowForm(true);
        reset({ name: row.name });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete module?")) return;
        await deleteModule(id);
        fetchData();
    };

    return (
        <div className="page-wrapper">

            {!showForm ? (
                <>
                    <div className="card-header-row">
                        <h2>Modules</h2>

                        <button
                            className="btn btn-primary mb-2"
                            onClick={() => { setShowForm(true); reset(); }}
                        >
                            Add Module
                        </button>
                    </div>

                    <div className="table-scroll">
                        <table className="table-pro table-admin">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th className="table-actions">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {list.map(row => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.name}</td>

                                        <td className="table-actions">
                                            <button className="btn btn-info btn-sm" onClick={() => handleView(row)}>
                                                View
                                            </button>

                                            <button className="btn btn-warning btn-sm ms-2" onClick={() => handleEdit(row)}>
                                                Edit
                                            </button>

                                            <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(row.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </>
            ) : (
                <div className="card p-3 shadow">

                    <h4>
                        {isView ? "View Module"
                            : editId ? "Update Module"
                                : "Add Module"}
                    </h4>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row mt-2">

                            {/* Module ID (only in View / Edit mode) */}
                            {(editId || isView) && (
                                <div className="col-md-4">
                                    <label>Module ID</label>

                                    <div className="form-control bg-light fw-semibold">
                                        {viewData?.id || editId}
                                    </div>
                                </div>
                            )}

                            {/* Module Name */}
                            <div className="col-md-8">
                                <label>Module Name</label>

                                {isView ? (
                                    <div className="form-control bg-light fw-semibold">
                                        {viewData?.name}
                                    </div>
                                ) : (
                                    <input
                                        className="form-control"
                                        {...register("name")}
                                    />
                                )}
                            </div>

                        </div>

                        <div className="mt-3">
                            <button
                                type="button"
                                className="btn btn-secondary me-2"
                                onClick={() => {
                                    reset();
                                    setShowForm(false);
                                    setEditId(null);
                                    setViewData(null);
                                }}
                            >
                                Back to List
                            </button>

                            {!isView && (
                                <button type="submit" className="btn btn-primary">
                                    {editId ? "Save Changes" : "Add Module"}
                                </button>
                            )}
                        </div>

                    </form>
                </div>
            )}
        </div>
    );
}
