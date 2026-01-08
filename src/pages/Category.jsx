import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { buildImageUrl } from "../services/image.helper";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../services/category.service";

export default function Category() {

  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: "", text: "" }
  });

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => { fetchCategories(); }, []);

  const onSubmit = async (values) => {
    const fd = new FormData();

    if (values.image?.[0]) fd.append("image", values.image[0]);
    fd.append("name", values.name);
    fd.append("text", values.text || "");

    if (viewData) return;

    editId
      ? await updateCategory(editId, fd)
      : await createCategory(fd);

    reset();
    setEditId(null);
    setShowForm(false);
    fetchCategories();
  };

  const handleEdit = (row) => {
    setEditId(row.id);
    setViewData(null);
    setCurrentImage(row.image);   // ✅ ADD

    setShowForm(true);
    reset({
      name: row.name,
      text: row.text
    });
  };

  const handleView = (row) => {
    setViewData(row);
    setEditId(null);
    setShowForm(true);
    reset({
      name: row.name,
      text: row.text
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete category?")) return;
    await deleteCategory(id);
    fetchCategories();
  };

  const isView = Boolean(viewData);

  return (
    <div className="page-wrapper">

      {!showForm ? (
        <>
          <div className="card-header-row">
            <h2>Categories</h2>

            <button
              className="btn btn-primary mb-2"
              onClick={() => {
                reset();
                setEditId(null);
                setViewData(null);
                setCurrentImage(null);   // ✅ ADD
                setShowForm(true);
              }}
            >
              Add Category
            </button>

          </div>

          <div className="table-scroll">
            <table className="table-pro table-admin">
              <thead>
                <tr>
                  <th className="table-img">Image</th>
                  <th>Name</th>
                  <th className="wrap-col">Description</th>
              
                </tr>
              </thead>

              <tbody>
                {categories.map(c => (
                  <tr key={c.id}>
                    <td className="table-img">
                      {c.image
                        ? <img src={buildImageUrl(c.image)} width={70} />
                        : <span>No Image</span>
                      }
                    </td>

                    <td>{c.name}</td>

                    {/* 👇 multiline wrapping enabled */}
                    <td className="wrap-col">
                      {c.text || "-"}
                    </td>

                    <td className="table-actions">
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => handleView(c)}
                      >
                        View
                      </button>

                      <button
                        className="btn btn-warning btn-sm ms-2"
                        onClick={() => handleEdit(c)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm ms-2"
                        onClick={() => handleDelete(c.id)}
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
            {isView ? "View Category"
              : editId ? "Update Category"
                : "Add Category"}
          </h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-2">

              <div className="col-md-6">
                <label>Name</label>
                <input
                  className="form-control"
                  {...register("name")}
                  disabled={isView}
                />
              </div>

              <div className="col-md-6">
                <label>Description</label>
                <input
                  className="form-control"
                  {...register("text")}
                  disabled={isView}
                />
              </div>

              <div className="col-md-12 mt-2">
                <label>Category Image</label>

                {currentImage && (
                  <img
                    src={buildImageUrl(currentImage)}
                    width={100}
                    height={100}
                    className="d-block mb-2 border rounded object-fit-cover"
                  />
                )}


                {!isView && (
                  <input
                    type="file"
                    className="form-control"
                    {...register("image")}
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
                  setCurrentImage(null);   // ✅ ADD
                }}
              >
                Back to List
              </button>


              {!isView && (
                <button type="submit" className="btn btn-primary">
                  {editId ? "Save Changes" : "Add Category"}
                </button>
              )}
            </div>

          </form>
        </div>
      )}
    </div>
  );
}
