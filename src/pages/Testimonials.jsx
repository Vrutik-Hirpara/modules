import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from "../services/testimonials.service";
import { buildImageUrl } from "../services/image.helper";

export default function Testimonials() {

  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewData, setViewData] = useState(null); // 👁️ view mode

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: "", review: "", rating: "" }
  });

  const fetchData = async () => {
    const data = await getTestimonials();
    setList(data);
  };

  useEffect(() => { fetchData(); }, []);

  const isView = Boolean(viewData);

  // ================= SUBMIT =================
  const onSubmit = async (values) => {
    if (isView) return;

    const fd = new FormData();
    fd.append("name", values.name);
    fd.append("review", values.review);
    fd.append("rating", values.rating);

    // image optional in edit
    if (values.image?.[0]) {
      fd.append("image", values.image[0]);
    }

    editId
      ? await updateTestimonial(editId, fd)
      : await createTestimonial(fd);

    reset();
    setEditId(null);
    setViewData(null);
    setShowForm(false);
    fetchData();
  };

  // ================= HANDLERS =================
  const handleView = (row) => {
    setViewData(row);
    setEditId(null);
    setShowForm(true);
    reset(row);
  };

  const handleEdit = (row) => {
    setEditId(row.id);
    setViewData(null);
    setShowForm(true);
    reset({
      name: row.name,
      review: row.review,
      rating: row.rating
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete testimonial?")) return;
    await deleteTestimonial(id);
    fetchData();
  };

  const currentEditImage =
    editId && list.find(i => i.id === editId)?.image;

  // ================= UI =================
  return (
    <div className="page-wrapper">

      {/* ================= LIST ================= */}
      {!showForm ? (
        <>
          <div className="card-header-row">
            <h2>Testimonials</h2>

            <button
              className="btn btn-primary mb-2"
              onClick={() => {
                reset();
                setShowForm(true);
              }}
            >
              Add Testimonial
            </button>
          </div>

          <div className="table-scroll">
            <table className="table-pro table-admin">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Review</th>
                  <th>Rating</th>
                  <th className="table-actions">Actions</th>
                </tr>
              </thead>

              <tbody>
                {list.map(row => (
                  <tr key={row.id}>
                    <td>
                      <img
                        src={buildImageUrl(row.image)}
                        width={70}
                        height={70}
                        className="rounded"
                      />
                    </td>
                    <td>{row.name}</td>
                    <td className="wrap-col">{row.review}</td>
                    <td>{row.rating}</td>

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

        /* ================= FORM ================= */
        <div className="card p-3 shadow">
          <h4>
            {isView
              ? "View Testimonial"
              : editId
                ? "Update Testimonial"
                : "Add Testimonial"}
          </h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-2">

              {/* NAME */}
              <div className="col-md-6">
                <label>Name</label>
                {isView ? (
                  <div className="form-control bg-light fw-semibold">
                    {viewData?.name}
                  </div>
                ) : (
                  <input className="form-control" {...register("name")} />
                )}
              </div>

              {/* RATING */}
              <div className="col-md-6">
                <label>Rating</label>
                {isView ? (
                  <div className="form-control bg-light fw-semibold">
                    {viewData?.rating}
                  </div>
                ) : (
                  <input
                    type="number"
                    className="form-control"
                    {...register("rating")}
                  />
                )}
              </div>

              {/* REVIEW */}
              <div className="col-md-12 mt-2">
                <label>Review</label>
                {isView ? (
                  <div className="form-control bg-light">
                    {viewData?.review}
                  </div>
                ) : (
                  <textarea
                    rows={3}
                    className="form-control"
                    {...register("review")}
                  />
                )}
              </div>

              {/* IMAGE */}
              <div className="col-md-12 mt-2">
                <label>Image</label>

                {/* VIEW MODE */}
                {isView && viewData?.image && (
                  <img
                    src={buildImageUrl(viewData.image)}
                    width={120}
                    className="d-block mb-2 rounded border"
                  />
                )}

                {/* EDIT MODE */}
                {editId && !isView && currentEditImage && (
                  <>
                    <img
                      src={buildImageUrl(currentEditImage)}
                      width={120}
                      className="d-block mb-2 rounded border"
                    />
                    <small className="text-muted">
                      Leave empty to keep existing image
                    </small>
                  </>
                )}

                {/* FILE INPUT */}
                {!isView && (
                  <input
                    type="file"
                    className="form-control mt-1"
                    {...register("image")}
                  />
                )}
              </div>

            </div>

            {/* ACTIONS */}
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
                  {editId ? "Save Changes" : "Add Testimonial"}
                </button>
              )}
            </div>

          </form>
        </div>
      )}

    </div>
  );
}


// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import {
//   getTestimonials,
//   createTestimonial,
//   updateTestimonial,
//   deleteTestimonial
// } from "../services/testimonials.service";
// import { buildImageUrl } from "../services/image.helper";

// export default function Testimonials() {

//   const [list, setList] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [viewData, setViewData] = useState(null);   // 👁️ VIEW MODE

//   const { register, handleSubmit, reset } = useForm({
//     defaultValues: { name: "", review: "", rating: "" }
//   });

//   const fetchData = async () => {
//     const data = await getTestimonials();
//     setList(data);
//   };

//   useEffect(() => { fetchData(); }, []);

//   const isView = Boolean(viewData);

//   const onSubmit = async (values) => {
//     if (isView) return;   // 🚫 block submit when viewing

//     const fd = new FormData();
//     fd.append("name", values.name);
//     fd.append("review", values.review);
//     fd.append("rating", values.rating);

//     if (values.image?.[0]) fd.append("image", values.image[0]);

//     editId
//       ? await updateTestimonial(editId, fd)
//       : await createTestimonial(fd);

//     reset();
//     setEditId(null);
//     setViewData(null);
//     setShowForm(false);
//     fetchData();
//   };

//   const handleView = (row) => {
//     setViewData(row);
//     setEditId(null);
//     setShowForm(true);

//     reset({
//       name: row.name,
//       review: row.review,
//       rating: row.rating
//     });
//   };

//   const handleEdit = (row) => {
//     setEditId(row.id);
//     setViewData(null);
//     setShowForm(true);

//     reset({
//       name: row.name,
//       review: row.review,
//       rating: row.rating
//     });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete testimonial?")) return;
//     await deleteTestimonial(id);
//     fetchData();
//   };

//   return (
//     <div className="page-wrapper">

//       {!showForm ? (
//         <>
//           <div className="card-header-row">
//             <h2>Testimonials</h2>

//             <button className="btn btn-primary mb-2" onClick={() => setShowForm(true)}>
//               Add Testimonial
//             </button>
//           </div>

//           <div className="table-scroll">
//             <table className="table-pro table-admin">
//               <thead>
//                 <tr>
//                   <th className="table-img">Image</th>
//                   <th>Name</th>
//                   <th className="wrap-col">Review</th>
//                   <th>Rating</th>
//                   <th className="table-actions">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {list.map(t => (
//                   <tr key={t.id}>
//                     <td className="table-img">
//                       <img src={buildImageUrl(t.image)} width={70} height={70} />
//                     </td>

//                     <td>{t.name}</td>
//                     <td className="wrap-col">{t.review}</td>
//                     <td>{t.rating}</td>

//                     <td className="table-actions">
//                       <button className="btn btn-info btn-sm" onClick={() => handleView(t)}>
//                         View
//                       </button>

//                       <button className="btn btn-warning btn-sm ms-2" onClick={() => handleEdit(t)}>
//                         Edit
//                       </button>

//                       <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(t.id)}>
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>

//             </table>
//           </div>
//         </>
//       ) : (
//         <div className="card p-3 shadow">
//           <h4>
//             {isView ? "View Testimonial"
//               : editId ? "Update Testimonial"
//               : "Add Testimonial"}
//           </h4>

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="row mt-2">

//               <div className="col-md-6">
//                 <label>Name</label>
//                 {isView ? (
//                   <div className="form-control bg-light fw-semibold">{viewData?.name}</div>
//                 ) : (
//                   <input className="form-control" {...register("name")} />
//                 )}
//               </div>

//               <div className="col-md-6">
//                 <label>Rating</label>
//                 {isView ? (
//                   <div className="form-control bg-light fw-semibold">{viewData?.rating}</div>
//                 ) : (
//                   <input type="number" className="form-control" {...register("rating")} />
//                 )}
//               </div>

//               <div className="col-md-12 mt-2">
//                 <label>Review</label>
//                 {isView ? (
//                   <div className="form-control bg-light">{viewData?.review}</div>
//                 ) : (
//                   <textarea rows={3} className="form-control" {...register("review")} />
//                 )}
//               </div>

//               <div className="col-md-12 mt-2">
//                 <label>Image</label>

//                 {isView && viewData?.image && (
//                   <img src={buildImageUrl(viewData.image)} width={110} className="d-block mb-2" />
//                 )}

//                 {!isView && (
//                   <input type="file" className="form-control" {...register("image")} />
//                 )}
//               </div>

//             </div>

//             <div className="mt-3">
//               <button
//                 type="button"
//                 className="btn btn-secondary me-2"
//                 onClick={() => { reset(); setShowForm(false); setEditId(null); setViewData(null); }}
//               >
//                 Back to List
//               </button>

//               {!isView && (
//                 <button type="submit" className="btn btn-primary">
//                   {editId ? "Save Changes" : "Add Testimonial"}
//                 </button>
//               )}
//             </div>

//           </form>
//         </div>
//       )}

//     </div>
//   );
// }
