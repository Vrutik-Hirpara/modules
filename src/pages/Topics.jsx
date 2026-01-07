import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    getTopics,
    createTopic,
    updateTopic,
    deleteTopic
} from "../services/topics.service";
import { getModules } from "../services/modules.service";

export default function Topics() {

    const [list, setList] = useState([]);
    const [modules, setModules] = useState([]);

    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [viewData, setViewData] = useState(null);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: { module_id: "", name: "" }
    });

    // ---------- LOAD DATA ----------
    const fetchData = async () => {
        const topicsRes = await getTopics();     // /topics/
        setList(topicsRes);

        const modulesRes = await getModules();   // /modules/
        setModules(modulesRes);
    };

    useEffect(() => { fetchData(); }, []);

    const isView = Boolean(viewData);

    // ---------- SUBMIT ----------
    const onSubmit = async (values) => {
        if (isView) return;

        const payload = {
            module_id: Number(values.module_id),
            name: values.name
        };

        editId
            ? await updateTopic(editId, payload)
            : await createTopic(payload);

        reset();
        setEditId(null);
        setShowForm(false);
        fetchData();
    };

    // ---------- ACTIONS ----------
    const handleEdit = (row) => {
        setEditId(row.id);
        setViewData(null);
        setShowForm(true);

        reset({
            module_id: row.module_id,
            name: row.name
        });
    };

    const handleView = (row) => {
        setViewData(row);
        setEditId(null);
        setShowForm(true);

        reset({
            module_id: row.module_id,
            name: row.name
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete topic?")) return;
        await deleteTopic(id);
        fetchData();
    };

    // ---------- UI ----------
    return (
        <div className="page-wrapper">

            {!showForm ? (
                <>
                    <div className="card-header-row">
                        <h2>Topics</h2>

                        <button
                            className="btn btn-primary"
                            onClick={() => { reset(); setShowForm(true); }}
                        >
                            Add Topic
                        </button>
                    </div>

                    <div className="table-scroll">
                        <table className="table-pro table-admin">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Day</th>
                                    <th>Topic Name</th>
                                    <th className="table-actions">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {list.map(row => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.module_name}</td>
                                        <td>{row.name}</td>

                                        <td className="table-actions">
                                            <button
                                                className="btn btn-info btn-sm"
                                                onClick={() => handleView(row)}
                                            >
                                                View
                                            </button>

                                            <button
                                                className="btn btn-warning btn-sm ms-2"
                                                onClick={() => handleEdit(row)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm ms-2"
                                                onClick={() => handleDelete(row.id)}
                                            >
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
                        {isView ? "View Topic"
                            : editId ? "Update Topic"
                                : "Add Topic"}
                    </h4>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row mt-2">

                            {(editId || isView) && (
                                <div className="col-md-4">
                                    <label>Topic ID</label>
                                    <div className="form-control bg-light fw-semibold">
                                        {viewData?.id || editId}
                                    </div>
                                </div>
                            )}

                            {/* ---- DAY DROPDOWN ---- */}
                            <div className="col-md-4">
                                <label>Select Day</label>

                                {isView ? (
                                    <div className="form-control bg-light fw-semibold">
                                        {viewData?.module_name}
                                    </div>
                                ) : (
                                    <select
                                        className="form-control"
                                        {...register("module_id")}
                                        required
                                    >
                                        <option value="">-- Select Day --</option>

                                        {modules.map(m => (
                                            <option key={m.id} value={m.id}>
                                                {m.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {/* ---- TOPIC NAME ---- */}
                            <div className="col-md-4">
                                <label>Topic Name</label>

                                {isView ? (
                                    <div className="form-control bg-light fw-semibold">
                                        {viewData?.name}
                                    </div>
                                ) : (
                                    <input
                                        className="form-control"
                                        {...register("name")}
                                        placeholder="Enter topic name"
                                        required
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
                                    {editId ? "Save Changes" : "Add Topic"}
                                </button>
                            )}
                        </div>

                    </form>
                </div>
            )}
        </div>
    );
}
