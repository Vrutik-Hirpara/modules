import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse
} from "../services/course.service";

import { getCategories } from "../services/category.service";
import { buildImageUrl } from "../services/image.helper";

export default function Courses() {
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);

  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      category: "",
      name: "",
      text: "",
      duration: "",
      lecture: "",
      students: "",
      level: "",
      language: "",
      certificate: ""
    }
  });

  // ---------- LOAD DATA ----------
  const fetchData = async () => {
    const courseData = await getCourses();
    const categoryData = await getCategories();

    setList(courseData);
    setCategories(categoryData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isView = Boolean(viewData);

  // ---------- SUBMIT ----------
  const onSubmit = async (values) => {
    if (isView) return;

    try {
      const fd = new FormData();

      fd.append("category", Number(values.category));
      fd.append("name", values.name);
      fd.append("text", values.text);
      fd.append("duration", values.duration);
      fd.append("lecture", values.lecture);
      fd.append("students", values.students);
      fd.append("level", values.level);
      fd.append("language", values.language);
      fd.append("certificate", values.certificate);

      if (values.image?.[0]) {
        fd.append("image", values.image[0]); // ✅ only one image
      }

      editId
        ? await updateCourse(editId, fd)
        : await createCourse(fd);

      reset();
      setEditId(null);
      setShowForm(false);
      fetchData();
    } catch (err) {
      console.log("API ERROR 👉", err.response?.data);
    }
  };

  // ---------- ACTIONS ----------
  const handleEdit = (row) => {
    setEditId(row.id);
    setViewData(null);
    setCurrentImage(row.image);
    setShowForm(true);

    reset({
      category: row.category,
      name: row.name,
      text: row.text,
      duration: row.duration,
      lecture: row.lecture,
      students: row.students,
      level: row.level,
      language: row.language,
      certificate: row.certificate
    });
  };

  const handleView = (row) => {
    setViewData(row);
    setEditId(null);
    setCurrentImage(row.image);
    setShowForm(true);

    reset({
      category: row.category,
      name: row.name,
      text: row.text,
      duration: row.duration,
      lecture: row.lecture,
      students: row.students,
      level: row.level,
      language: row.language,
      certificate: row.certificate
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete course?")) return;
    await deleteCourse(id);
    fetchData();
  };

  // ---------- UI ----------
  return (
    <div className="page-wrapper">
      {!showForm ? (
        <>
          <div className="card-header-row">
            <h2>Courses</h2>

            <button
              className="btn btn-primary mb-2"
              onClick={() => {
                reset();
                setEditId(null);
                setViewData(null);
                setCurrentImage(null);
                setShowForm(true);
              }}
            >
              Add Course
            </button>
          </div>

          <div className="table-scroll">
            <table className="table-pro table-admin">
              <thead>
                <tr>
                  <th className="table-img">Image</th>
                  <th className="name-col">Name</th>
                  <th>Category</th>
                  <th className="desc-col">Description</th>
                  <th>Duration</th>
                  <th>Lecture</th>
                  <th>Students</th>
                  <th>Level</th>
                  <th>Language</th>
                  <th>Certificate</th>
                  <th className="table-actions">Actions</th>
                </tr>
              </thead>

              <tbody>
                {list.map((row) => (
                  <tr key={row.id}>
                    <td className="table-img">
                      {row.image ? (
                        <img
                          src={buildImageUrl(row.image)}
                          width={60}
                          height={60}
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td className="name-col">{row.name}</td>
                    <td>{row.category_details?.name}</td>
                    <td className="desc-col">{row.text}</td>
                    <td>{row.duration}</td>
                    <td>{row.lecture}</td>
                    <td>{row.students}</td>
                    <td>{row.level}</td>
                    <td>{row.language}</td>
                    <td>{row.certificate}</td>

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
            {isView ? "View Course" : editId ? "Update Course" : "Add Course"}
          </h4>

          {/* FORM */}
          {/* Your form JSX stays exactly as you wrote — it is already correct */}
        </div>
      )}
    </div>
  );
}










// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import {
//     getCourses,
//     createCourse,
//     updateCourse,
//     deleteCourse
// } from "../services/course.service";
// import { buildImageUrl } from "../services/image.helper";

// export default function Courses() {

//     const [list, setList] = useState([]);
//     const [editId, setEditId] = useState(null);
//     const [showForm, setShowForm] = useState(false);
//     const [viewData, setViewData] = useState(null);


//     const { register, handleSubmit, reset } = useForm({
//         defaultValues: {
//             category: "",
//             name: "",
//             text: "",
//             image: null,
//             banner_img: null,
//             pdf_file: null
//         }
//     });

//     //fetch data
//     const fetchData = async () => {
//         const data = await getCourses();
//         setList(data);
//     };

//     useEffect(() => { fetchData(); }, []);

//     //
//     const onSubmit = async (values) => {
//         try {
//             const formData = new FormData();

//             formData.append("category", Number(values.category));
//             formData.append("name", values.name);
//             formData.append("text", values.text);

//             if (values.image?.[0]) formData.append("image", values.image[0]);
//             if (values.banner_img?.[0]) formData.append("banner_img", values.banner_img[0]);
//             if (values.pdf_file?.[0]) formData.append("pdf_file", values.pdf_file[0]);

//             if (editId) {
//                 await updateCourse(editId, formData);
//             } else {
//                 await createCourse(formData);
//             }

//             reset();
//             setEditId(null);
//             setShowForm(false);
//             fetchData();

//         } catch (err) {
//             console.log("API ERROR 👉", err.response?.data);
//         }
//     };

//     const handleEdit = (row) => {
//         setEditId(row.id);
//         setShowForm(true);

//         reset({
//             category: row.category,
//             name: row.name,
//             text: row.text,
//             image: null,
//             banner_img: null,
//             pdf_file: null
//         });
//     };
//     const handleView = (row) => {
//         setViewData(row);
//         setShowForm(true);
//         setEditId(null);   // not editing mode

//         reset({
//             category: row.category,
//             name: row.name,
//             text: row.text
//         });
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm("Delete course?")) return;
//         await deleteCourse(id);
//         fetchData();
//     };


//     return (
//         <div className="container mt-4">

//             {showForm ? (
//                 <div className="card p-3 shadow">

//                     <form onSubmit={handleSubmit(onSubmit)}>

//                         <div className="row mt-2">
//                             <button
//                                 type="button"
//                                 className="btn btn-secondary me-2"
//                                 onClick={() => {
//                                     reset();
//                                     setShowForm(false);
//                                     setEditId(null);
//                                     setViewData(null);
//                                 }}
//                             >
//                                 Back to List
//                             </button>

//                             <div className="col-md-6">
//                                 <label>Category ID</label>
//                                 <select className="form-control" {...register("category", { required: true })}>
//                                     {list.map(c => (
//                                         <option key={c.category_details.id} value={c.category_details.id}>
//                                             {c.category_details.name}
//                                         </option>
//                                     ))}
//                                 </select>

//                             </div>

//                             <div className="col-md-6">
//                                 <label>Course Name</label>
//                                 <input
//                                     className="form-control"
//                                     {...register("name", { required: true })}
//                                     disabled={viewData !== null}
//                                 />
//                             </div>

//                             <div className="col-md-12 mt-2">
//                                 <label>Description</label>
//                                 <textarea
//                                     className="form-control"
//                                     rows={3}
//                                     {...register("text")}
//                                     disabled={viewData !== null}
//                                 />
//                             </div>
//                             {viewData && viewData.image && (
//                                 <div className="mt-2">
//                                     <label>Current Image</label> <br />
//                                     <img
//                                         src={buildImageUrl(viewData.image)}
//                                         width={150}
//                                         style={{ borderRadius: 8 }}
//                                         alt="course"
//                                     />
//                                 </div>
//                             )}

//                             <div className="col-md-4 mt-2">
//                                 <label>Image</label>
//                                 <input type="file" className="form-control" {...register("image")} />
//                             </div>

//                             <div className="col-md-4 mt-2">
//                                 <label>Banner Image</label>
//                                 <input type="file" className="form-control" {...register("banner_img")} />
//                             </div>

//                             <div className="col-md-4 mt-2">
//                                 <label>PDF File</label>
//                                 <input type="file" className="form-control" {...register("pdf_file")} />
//                             </div>

//                         </div>


//                         {/* buttons here */}
//                         {viewData ? null : (
//                             <div className="mt-3">

//                                 <button
//                                     type="button"
//                                     className="btn btn-secondary me-2"
//                                     onClick={() => {
//                                         reset();
//                                         setShowForm(false);
//                                         setEditId(null);
//                                         setViewData(null);
//                                     }}
//                                 >
//                                     Back to List
//                                 </button>

//                                 <button type="submit" className="btn btn-primary">
//                                     {editId ? "Save Changes" : "Add Course"}
//                                 </button>

//                             </div>
//                         )}



//                     </form>
//                 </div>
//             ) : (
//                 <>
//                     <button
//                         className="btn btn-primary mb-3"
//                         onClick={() => { reset(); setEditId(null); setShowForm(true); }}
//                     >
//                         Add Course
//                     </button>

//                     {/* 🔹 STEP-4 — Table */}
//                     <table className="table table-bordered">
//                         <thead>
//                             <tr>
//                                 <th style={{ width: "90px" }}>Image</th>
//                                 <th style={{ width: "90px" }}>Name</th>
//                                 <th style={{ width: "90px" }}>Category</th>
//                                 <th style={{ width: "90px" }}>Text</th>
//                                 <th style={{ width: "120px" }}>Actions</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {list.map(c => (
//                                 <tr key={c.id}>

//                                     <td>
//                                         <img src={buildImageUrl(c.image)} width={70} />
//                                         <img src={buildImageUrl(c.banner_img)} width={70} />

//                                         <img src={buildImageUrl(c.pdf_file)} width={70} />

//                                     </td>

//                                     <td>{c.name}</td>
//                                     <td>{c.category_details?.name}</td>
//                                     <td>{c.text?.slice(0, 40)}...</td>

//                                     <td>
//                                         <button
//                                             className="btn btn-info btn-sm me-2"
//                                             onClick={() => handleView(c)}
//                                         >
//                                             👁 View
//                                         </button>

//                                         <button
//                                             className="btn btn-warning btn-sm me-2"
//                                             onClick={() => handleEdit(c)}
//                                         >
//                                             Edit
//                                         </button>

//                                         <button
//                                             className="btn btn-danger btn-sm"
//                                             onClick={() => handleDelete(c.id)}
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