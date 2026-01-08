import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle
} from "../services/articless.service";
import { buildImageUrl } from "../services/image.helper";

export default function Articles() {

  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewData, setViewData] = useState(null);   // 👁️ view mode

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      course: "",
      tag: "",
      description: "",
      text: ""
    }
  });

  const fetchData = async () => {
    const data = await getArticles();
    setList(data);
  };

  useEffect(() => { fetchData(); }, []);

  const isView = Boolean(viewData);

  const onSubmit = async (values) => {
    const fd = new FormData();

    fd.append("course", Number(values.course));
    fd.append("tag", values.tag);
    fd.append("description", values.description);
    fd.append("text", values.text);

    if (values.image?.[0]) fd.append("image", values.image[0]);

    // 🚫 block submit in view mode
    if (isView) return;

    editId
      ? await updateArticle(editId, fd)
      : await createArticle(fd);

    reset();
    setEditId(null);
    setShowForm(false);
    fetchData();
  };

  const handleEdit = (row) => {
    setEditId(row.id);
    setViewData(null);
    setShowForm(true);
    reset({
      course: row.course,
      tag: row.tag,
      description: row.description,
      text: row.text
    });
  };

  const handleView = (row) => {
    setViewData(row);
    setEditId(null);
    setShowForm(true);
    reset({
      course: row.course,
      tag: row.tag,
      description: row.description,
      text: row.text
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete article?")) return;
    await deleteArticle(id);
    fetchData();
  };

  return (
    <div className="page-wrapper">

      {!showForm ? (
        <>
          <div className="card-header-row">
            <h2>Articles</h2>

            <button
              className="btn btn-primary mb-2"
              onClick={() => { setShowForm(true); reset(); }}
            >
              Add Article
            </button>
          </div>

          <div className="table-scroll">
            <table className="table-pro table-admin">
              <thead>
                <tr>
                  <th className="table-img">Image</th>
                  <th>Title / Tag</th>
                  <th>Course</th>
                  <th className="wrap-col">Description</th>
                  <th className="table-actions">Actions</th>
                </tr>
              </thead>

              <tbody>
                {list.map(row => (
                  <tr key={row.id}>
                    <td className="table-img">
                      {row.image
                        ? <img src={buildImageUrl(row.image)} width={70} />
                        : <span>No Image</span>}
                    </td>

                    <td>{row.tag}</td>
                    <td>{row.course_data?.name}</td>
                    <td className="wrap-col">{row.description?.slice(0, 40)}...</td>

                    <td className="table-actions">
                      <button className="btn btn-info btn-sm"
                        onClick={() => handleView(row)}>
                        View
                      </button>

                      <button className="btn btn-warning btn-sm ms-2"
                        onClick={() => handleEdit(row)}>
                        Edit
                      </button>

                      <button className="btn btn-danger btn-sm ms-2"
                        onClick={() => handleDelete(row.id)}>
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
            {isView ? "View Article"
              : editId ? "Update Article"
              : "Add Article"}
          </h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-2">

              <div className="col-md-6">
                <label>Course</label>
                <select
                  className="form-control"
                  {...register("course")}
                  disabled={isView}
                >
                  {list.map(c => (
                    c.course_data && (
                      <option key={c.course} value={c.course}>
                        {c.course_data.name}
                      </option>
                    )
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label>Tag</label>
                <input
                  className="form-control"
                  {...register("tag")}
                  disabled={isView}
                />
              </div>

              <div className="col-md-12 mt-2">
                <label>Description</label>
                <textarea
                  rows={2}
                  className="form-control"
                  {...register("description")}
                  disabled={isView}
                />
              </div>

              <div className="col-md-12 mt-2">
                <label>Text</label>
                <textarea
                  rows={3}
                  className="form-control"
                  {...register("text")}
                  disabled={isView}
                />
              </div>

              <div className="col-md-12 mt-2">
                <label>Article Image</label>

                {isView && viewData?.image && (
                  <img
                    src={buildImageUrl(viewData.image)}
                    width={140}
                    className="d-block mb-2"
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
                }}
              >
                Back to List
              </button>

              {!isView && (
                <button type="submit" className="btn btn-primary">
                  {editId ? "Save Changes" : "Add Article"}
                </button>
              )}
            </div>

          </form>
        </div>
      )}
    </div>
  );
}
