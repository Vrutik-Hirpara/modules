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

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: "", review: "", rating: "" }
  });

  const fetchData = async () => {
    const data = await getTestimonials();
    setList(data);
  };

  useEffect(() => { fetchData(); }, []);

  const onSubmit = async (values) => {
    const fd = new FormData();

    fd.append("name", values.name);
    fd.append("review", values.review);
    fd.append("rating", values.rating);

    if (values.image?.[0]) fd.append("image", values.image[0]);

    editId ? await updateTestimonial(editId, fd) : await createTestimonial(fd);

    reset();
    setEditId(null);
    setShowForm(false);
    fetchData();
  };

  const handleEdit = (row) => {
    setEditId(row.id);
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
          {/* HEADER */}
          <div className="card-header-row">
            <h2>Testimonials</h2>

            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              Add Testimonial
            </button>
          </div>

          {/* TABLE SCROLL */}
          <div className="table-scroll">
            <table className="table-pro table-admin">
              <thead>
                <tr>
                  <th className="table-img">Image</th>
                  <th className="table-name">Name</th>
                  <th className="table-text">Review</th>
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
                    <td>{t.review}</td>
                    <td>{t.rating}</td>

                    <td className="table-actions">
                      <button className="btn btn-warning btn-sm" onClick={() => handleEdit(t)}>
                        Edit
                      </button>

                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t.id)}>
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
          <h4>{editId ? "Update Testimonial" : "Add Testimonial"}</h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-2">

              <div className="col-md-6">
                <label>Name</label>
                <input className="form-control" {...register("name")} />
              </div>

              <div className="col-md-6">
                <label>Rating</label>
                <input type="number" className="form-control" {...register("rating")} />
              </div>

              <div className="col-md-12 mt-2">
                <label>Review</label>
                <textarea rows={3} className="form-control" {...register("review")} />
              </div>

              <div className="col-md-12 mt-2">
                <label>Image</label>
                <input type="file" className="form-control" {...register("image")} />
              </div>

            </div>

            <div className="mt-3">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => { reset(); setShowForm(false); setEditId(null); }}
              >
                Back to List
              </button>

              <button type="submit" className="btn btn-primary">
                {editId ? "Save Changes" : "Add Testimonial"}
              </button>
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
//     getTestimonials,
//     createTestimonial,
//     updateTestimonial,
//     deleteTestimonial
// } from "../services/testimonials.service";
// import { buildImageUrl } from "../services/image.helper";

// export default function Testimonials() {

//     // state
//     const [list, setList] = useState([]);
//     const [editId, setEditId] = useState(null);
//     const [showForm, setShowForm] = useState(false);

//     const { register, handleSubmit, reset } = useForm({
//         defaultValues: {
//             name: "",
//             review: "",
//             rating: "",
//             category: 44
//         }
//     });

//     // load
//     const fetchData = async () => {
//         const data = await getTestimonials();
//         setList(data);
//     };

//     useEffect(() => { fetchData(); }, []);

//     // submit
//     const onSubmit = async (values) => {
//         try {
//             const formData = new FormData();

//             formData.append("name", values.name);
//             formData.append("review", values.review);
//             formData.append("rating", values.rating);
//             formData.append("category_id", 44); // 🔥 fixed FK

//             if (values.image && values.image[0]) {
//                 formData.append("image", values.image[0]);
//             }

//             if (editId) {
//                 await updateTestimonial(editId, formData);
//             } else {
//                 await createTestimonial(formData);
//             }

//             reset();
//             setEditId(null);
//             setShowForm(false);
//             fetchData();

//         } catch (err) {
//             console.log("API ERROR 👉", err.response?.data);

//         }
//     };

//     // edit
//     const handleEdit = (row) => {
//         setEditId(row.id);
//         setShowForm(true);

//         reset({
//             name: row.name,
//             review: row.review,
//             rating: row.rating,
//             category: row.category,
//             image: null
//         });
//     };

//     // delete
//     const handleDelete = async (id) => {
//         if (!window.confirm("Delete testimonial?")) return;
//         await deleteTestimonial(id);
//         fetchData();
//     };

//     return (
//         <div className="container mt-4">

//             <h2>Testimonials</h2>

//             {showForm ? (
//                 // ------------ FORM VIEW ------------
//                 <div className="card p-3 shadow">

//                     <h4>{editId ? "Update Testimonial" : "Add Testimonial"}</h4>

//                     <form onSubmit={handleSubmit(onSubmit)}>

//                         <div className="row mt-2">

//                             <div className="col-md-6">
//                                 <label>Name</label>
//                                 <input
//                                     className="form-control"
//                                     {...register("name", { required: true })}
//                                     placeholder="Enter person name"
//                                 />
//                             </div>

//                             <div className="col-md-6">
//                                 <label>Rating</label>
//                                 <input
//                                     type="number"
//                                     min={1}
//                                     max={5}
//                                     className="form-control"
//                                     {...register("rating", { required: true })}
//                                     placeholder="1 to 5"
//                                 />
//                             </div>

//                             <div className="col-md-12 mt-2">
//                                 <label>Review</label>
//                                 <textarea
//                                     rows={3}
//                                     className="form-control"
//                                     {...register("review", { required: true })}
//                                     placeholder="Write feedback / review"
//                                 />
//                             </div>

//                             <div className="col-md-12 mt-2">
//                                 <label>Image</label>
//                                 <input
//                                     type="file"
//                                     className="form-control"
//                                     {...register("image")}
//                                 />
//                                 <small className="text-muted">
//                                     (Leave blank while editing if you don't want to change image)
//                                 </small>
//                             </div>

//                         </div>


//                         <div className="mt-3">
//                             <button
//                                 type="button"
//                                 className="btn btn-secondary me-2"
//                                 onClick={() => {
//                                     reset();
//                                     setShowForm(false);
//                                     setEditId(null);
//                                 }}
//                             >
//                                 Back to List
//                             </button>

//                             <button type="submit" className="btn btn-primary">
//                                 {editId ? "Save Changes" : "Add Testimonial"}
//                             </button>
//                         </div>

//                     </form>
//                 </div>

//             ) : (
//                 // ------------ TABLE VIEW ------------
//                 <>
//                     <button
//                         className="btn btn-primary mb-3"
//                         onClick={() => {
//                             reset();
//                             setEditId(null);
//                             setShowForm(true);
//                         }}
//                     >
//                         Add Testimonial
//                     </button>

//                     <table className="table table-bordered">
//                         <thead>
//                             <tr>
//                                 <th>Image</th>
//                                 <th>Name</th>
//                                 <th>Review</th>
//                                 <th>Rating</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {list.map((t) => (
//                                 <tr key={t.id}>
//                                     {console.log("IMAGE PATH 👉", t.image)}

//                                     <td>
//                                         <img
//                                             src={buildImageUrl(t.image)}
//                                             width={90}
//                                             height={90}
//                                             alt="testimonial"
//                                             referrerPolicy="no-referrer"
//                                             crossOrigin="anonymous"
//                                         />

//                                     </td>
//                                     <td>{t.name}</td>
//                                     <td>{t.review}</td>
//                                     <td>{t.rating}</td>

//                                     <td>
//                                         <button
//                                             className="btn btn-warning btn-sm me-2"
//                                             onClick={() => handleEdit(t)}
//                                         >
//                                             Edit
//                                         </button>

//                                         <button
//                                             className="btn btn-danger btn-sm"
//                                             onClick={() => handleDelete(t.id)}
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>

//                     </table>
//                 </>
//             )}

//         </div>
//     );
// }
