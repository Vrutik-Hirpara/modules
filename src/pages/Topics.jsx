// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";

// import {
//   getTopics,
//   createTopic,
//   updateTopic,
//   deleteTopic
// } from "../services/topics.service";

// import { getModules } from "../services/modules.service";

// export default function Topics() {

//   const [list, setList] = useState([]);
//   const [modules, setModules] = useState([]);

//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [viewData, setViewData] = useState(null);

//   const { register, handleSubmit, reset } = useForm({
//     defaultValues: { module_id: "", name: "" }
//   });

//   // ---------- FETCH DATA ----------
//   const fetchData = async () => {
//     const topicData = await getTopics();
//     setList(topicData);

//     const moduleData = await getModules();
//     setModules(moduleData);
//   };

//   useEffect(() => { fetchData(); }, []);

//   const isView = Boolean(viewData);

//   // ---------- SUBMIT (ADD / UPDATE) ----------
//   const onSubmit = async (values) => {
//     if (isView) return;

//     const payload = {
//       module: Number(values.module_id),
//       name: values.name
//     };

//     editId
//       ? await updateTopic(editId, payload)
//       : await createTopic(payload);

//     reset();
//     setEditId(null);
//     setViewData(null);
//     setShowForm(false);
//     fetchData();
//   };

//   // ---------- ACTIONS ----------
//   const handleView = (topic, row) => {
//     setViewData({ ...topic, module_name: row.module_name, module_id: row.module_id });
//     setEditId(null);
//     setShowForm(true);

//     reset({
//       module_id: row.module_id,
//       name: topic.name
//     });
//   };

//   const handleEdit = (topic, row) => {
//     setEditId(topic.id);
//     setViewData(null);
//     setShowForm(true);

//     reset({
//       module_id: row.module_id,
//       name: topic.name
//     });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete topic?")) return;
//     await deleteTopic(id);
//     fetchData();
//   };

//   return (
//     <div className="page-wrapper">

//       {!showForm ? (
//         <>
//           <div className="card-header-row">
//             <h2>Topics</h2>

//             <button
//               className="btn btn-primary"
//               onClick={() => { reset(); setEditId(null); setShowForm(true); }}
//             >
//               Add Topic
//             </button>
//           </div>

//           {/* ------- TABLE ------- */}
//           <div className="table-scroll">
//             <table className="table-pro table-admin">
//               <thead>
//                 <tr>
//                   <th>Day (Module)</th>
//                   <th>Topic Name</th>
//                   <th className="table-actions">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {list.map(row =>
//                   row.topics.map(t => (
//                     <tr key={t.id}>
//                       <td>{row.module_name}</td>
//                       <td>{t.name}</td>

//                       <td className="table-actions">

//                         {/* 👁 VIEW */}
//                         <button
//                           className="btn btn-info btn-sm"
//                           onClick={() => handleView(t, row)}
//                         >
//                           View
//                         </button>

//                         {/* ✏️ EDIT */}
//                         <button
//                           className="btn btn-warning btn-sm ms-2"
//                           onClick={() => handleEdit(t, row)}
//                         >
//                           Edit
//                         </button>

//                         {/* 🗑 DELETE */}
//                         <button
//                           className="btn btn-danger btn-sm ms-2"
//                           onClick={() => handleDelete(t.id)}
//                         >
//                           Delete
//                         </button>

//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>

//             </table>
//           </div>
//         </>
//       ) : (

//         <div className="card p-3 shadow">

//           <h4>
//             {isView ? "View Topic"
//               : editId ? "Update Topic"
//               : "Add Topic"}
//           </h4>

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="row mt-2">

//               {/* MODULE DROPDOWN */}
//               <div className="col-md-6">
//                 <label>Day / Module</label>

//                 {isView ? (
//                   <div className="form-control bg-light fw-semibold">
//                     {viewData?.module_name}
//                   </div>
//                 ) : (
//                   <select
//                     className="form-control"
//                     {...register("module_id")}
//                     required
//                   >
//                     <option value="">-- Select Day --</option>

//                     {modules.map(m => (
//                       <option key={m.id} value={m.id}>
//                         {m.name}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//               </div>

//               {/* TOPIC NAME */}
//               <div className="col-md-6">
//                 <label>Topic Name</label>

//                 {isView ? (
//                   <div className="form-control bg-light fw-semibold">
//                     {viewData?.name}
//                   </div>
//                 ) : (
//                   <input
//                     className="form-control"
//                     {...register("name")}
//                     required
//                   />
//                 )}
//               </div>

//             </div>

//             <div className="mt-3">
//               <button
//                 type="button"
//                 className="btn btn-secondary me-2"
//                 onClick={() => {
//                   reset();
//                   setShowForm(false);
//                   setEditId(null);
//                   setViewData(null);
//                 }}
//               >
//                 Back to List
//               </button>

//               {!isView && (
//                 <button type="submit" className="btn btn-primary">
//                   {editId ? "Save Changes" : "Add Topic"}
//                 </button>
//               )}
//             </div>

//           </form>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getTopics,
  createTopic,
  deleteTopic
} from "../services/topics.service";

import { getModules } from "../services/modules.service";

export default function Topics() {

  const [list, setList] = useState([]);
  const [modules, setModules] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);  // edit mode
  const [viewData, setViewData] = useState(null);  // view mode

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { module_id: "", name: "" }
  });

  const isView = Boolean(viewData);

  // ---------- FETCH DATA ----------
  const fetchData = async () => {
    const topicData = await getTopics();
    setList(topicData);

    const moduleData = await getModules();
    setModules(moduleData);
  };

  useEffect(() => { fetchData(); }, []);

  // ---------- SUBMIT (Only for Add — Edit not implemented yet) ----------
  const onSubmit = async (values) => {
    if (isView) return;   // block submit in view mode

    const payload = {
      module: Number(values.module_id),
      name: values.name
    };

    await createTopic(payload);

    reset();
    setEditData(null);
    setViewData(null);
    setShowForm(false);
    fetchData();
  };

  // ---------- OPEN VIEW ----------
  const handleView = (topic, row) => {
    setViewData({ ...topic, module_name: row.module_name });
    setEditData(null);
    setShowForm(true);

    reset({
      module_id: row.module_id || "",
      name: topic.name
    });
  };

  // ---------- OPEN EDIT (UI only — no update API yet) ----------
  const handleEdit = (topic, row) => {
    setEditData(topic);
    setViewData(null);
    setShowForm(true);

    reset({
      module_id: row.module_id || "",
      name: topic.name
    });
  };

  // ---------- DELETE ----------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this topic?")) return;
    await deleteTopic(id);
    fetchData();
  };

  return (
    <div className="page-wrapper">

      {!showForm ? (
        <>
          {/* ---------- HEADER ---------- */}
          <div className="card-header-row">
            <h2>Topics</h2>

            <button
              className="btn btn-primary mb-2"
              onClick={() => {
                reset();
                setEditData(null);
                setViewData(null);
                setShowForm(true);
              }}
            >
              Add Topic
            </button>
          </div>

          {/* ---------- TABLE ---------- */}
          <div className="table-scroll">
            <table className="table-pro table-admin">
              <thead>
                <tr>
                  <th>Day / Module</th>
                  <th>Topic Name</th>
                  <th className="table-actions">Actions</th>
                </tr>
              </thead>

              <tbody>
                {list.map(row =>
                  row.topics.map(t => (
                    <tr key={t.id}>
                      <td>{row.module_name}</td>
                      <td>{t.name}</td>

                      <td className="table-actions">

                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => handleView(t, row)}
                        >
                          View
                        </button>

                        <button
                          className="btn btn-warning btn-sm ms-2"
                          onClick={() => handleEdit(t, row)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => handleDelete(t.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </>
      ) : (

        /* ---------- FORM (Add / Edit / View) ---------- */
        <div className="card p-3 shadow">

          <h4>
            {isView
              ? "View Topic"
              : editData
              ? "Edit Topic"
              : "Add Topic"}
          </h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-2">

              {/* MODULE SELECT */}
              <div className="col-md-6">
                <label>Module / Day</label>

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
                    <option value="">-- Select Module --</option>
                    {modules.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* TOPIC NAME */}
              <div className="col-md-6">
                <label>Topic Name</label>

                {isView ? (
                  <div className="form-control bg-light fw-semibold">
                    {viewData?.name}
                  </div>
                ) : (
                  <input
                    className="form-control"
                    {...register("name")}
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
                  setEditData(null);
                  setViewData(null);
                  setShowForm(false);
                }}
              >
                Back to List
              </button>

              {!isView && (
                <button type="submit" className="btn btn-primary">
                  {editData ? "Save Changes" : "Add Topic"}
                </button>
              )}
            </div>

          </form>
        </div>
      )}

    </div>
  );
}

