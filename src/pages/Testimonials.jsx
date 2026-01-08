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

//   const { register, handleSubmit, reset } = useForm({
//     defaultValues: { name: "", review: "", rating: "" }
//   });

//   const fetchData = async () => {
//     const data = await getTestimonials();
//     setList(data);
//   };

//   useEffect(() => { fetchData(); }, []);

//   const onSubmit = async (values) => {
//     const fd = new FormData();

//     fd.append("name", values.name);
//     fd.append("review", values.review);
//     fd.append("rating", values.rating);

//     if (values.image?.[0]) fd.append("image", values.image[0]);

//     editId ? await updateTestimonial(editId, fd) : await createTestimonial(fd);

//     reset();
//     setEditId(null);
//     setShowForm(false);
//     fetchData();
//   };

//   const handleEdit = (row) => {
//     setEditId(row.id);
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
//           {/* HEADER */}
//           <div className="card-header-row">
//             <h2>Testimonials</h2>

//             <button className="btn btn-primary" onClick={() => setShowForm(true)}>
//               Add Testimonial
//             </button>
//           </div>

//           {/* TABLE SCROLL */}
//           <div className="table-scroll">
//             <table className="table-pro table-admin">
//               <thead>
//                 <tr>
//                   <th className="table-img">Image</th>
//                   <th className="table-name">Name</th>
//                   <th className="table-text">Review</th>
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
//                     <td>{t.review}</td>
//                     <td>{t.rating}</td>

//                     <td className="table-actions">
//                       <button className="btn btn-warning btn-sm" onClick={() => handleEdit(t)}>
//                         Edit
//                       </button>

//                       <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t.id)}>
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
//           <h4>{editId ? "Update Testimonial" : "Add Testimonial"}</h4>

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="row mt-2">

//               <div className="col-md-6">
//                 <label>Name</label>
//                 <input className="form-control" {...register("name")} />
//               </div>

//               <div className="col-md-6">
//                 <label>Rating</label>
//                 <input type="number" className="form-control" {...register("rating")} />
//               </div>

//               <div className="col-md-12 mt-2">
//                 <label>Review</label>
//                 <textarea rows={3} className="form-control" {...register("review")} />
//               </div>

//               <div className="col-md-12 mt-2">
//                 <label>Image</label>
//                 <input type="file" className="form-control" {...register("image")} />
//               </div>

//             </div>

//             <div className="mt-3">
//               <button
//                 type="button"
//                 className="btn btn-secondary me-2"
//                 onClick={() => { reset(); setShowForm(false); setEditId(null); }}
//               >
//                 Back to List
//               </button>

//               <button type="submit" className="btn btn-primary">
//                 {editId ? "Save Changes" : "Add Testimonial"}
//               </button>
//             </div>

//           </form>
//         </div>
//       )}

//     </div>
//   );
// }

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
  const [viewData, setViewData] = useState(null);   // 👁️ VIEW MODE

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: "", review: "", rating: "" }
  });

  const fetchData = async () => {
    const data = await getTestimonials();
    setList(data);
  };

  useEffect(() => { fetchData(); }, []);

  const isView = Boolean(viewData);

  const onSubmit = async (values) => {
    if (isView) return;   // 🚫 block submit when viewing

    const fd = new FormData();
    fd.append("name", values.name);
    fd.append("review", values.review);
    fd.append("rating", values.rating);

    if (values.image?.[0]) fd.append("image", values.image[0]);

    editId
      ? await updateTestimonial(editId, fd)
      : await createTestimonial(fd);

    reset();
    setEditId(null);
    setViewData(null);
    setShowForm(false);
    fetchData();
  };

  const handleView = (row) => {
    setViewData(row);
    setEditId(null);
    setShowForm(true);

    reset({
      name: row.name,
      review: row.review,
      rating: row.rating
    });
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

  return (
    <div className="page-wrapper">

      {!showForm ? (
        <>
          <div className="card-header-row">
            <h2>Testimonials</h2>

            <button className="btn btn-primary mb-2" onClick={() => setShowForm(true)}>
              Add Testimonial
            </button>
          </div>

          <div className="table-scroll">
            <table className="table-pro table-admin">
              <thead>
                <tr>
                  <th className="table-img">Image</th>
                  <th>Name</th>
                  <th className="wrap-col">Review</th>
                  <th>Rating</th>
                  <th className="table-actions">Actions</th>
                </tr>
              </thead>

              <tbody>
                {list.map(t => (
                  <tr key={t.id}>
                    <td className="table-img">
                      <img src={buildImageUrl(t.image)} width={70} height={70} />
                    </td>

                    <td>{t.name}</td>
                    <td className="wrap-col">{t.review}</td>
                    <td>{t.rating}</td>

                    <td className="table-actions">
                      <button className="btn btn-info btn-sm" onClick={() => handleView(t)}>
                        View
                      </button>

                      <button className="btn btn-warning btn-sm ms-2" onClick={() => handleEdit(t)}>
                        Edit
                      </button>

                      <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(t.id)}>
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
            {isView ? "View Testimonial"
              : editId ? "Update Testimonial"
              : "Add Testimonial"}
          </h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-2">

              <div className="col-md-6">
                <label>Name</label>
                {isView ? (
                  <div className="form-control bg-light fw-semibold">{viewData?.name}</div>
                ) : (
                  <input className="form-control" {...register("name")} />
                )}
              </div>

              <div className="col-md-6">
                <label>Rating</label>
                {isView ? (
                  <div className="form-control bg-light fw-semibold">{viewData?.rating}</div>
                ) : (
                  <input type="number" className="form-control" {...register("rating")} />
                )}
              </div>

              <div className="col-md-12 mt-2">
                <label>Review</label>
                {isView ? (
                  <div className="form-control bg-light">{viewData?.review}</div>
                ) : (
                  <textarea rows={3} className="form-control" {...register("review")} />
                )}
              </div>

              <div className="col-md-12 mt-2">
                <label>Image</label>

                {isView && viewData?.image && (
                  <img src={buildImageUrl(viewData.image)} width={110} className="d-block mb-2" />
                )}

                {!isView && (
                  <input type="file" className="form-control" {...register("image")} />
                )}
              </div>

            </div>

            <div className="mt-3">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => { reset(); setShowForm(false); setEditId(null); setViewData(null); }}
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
