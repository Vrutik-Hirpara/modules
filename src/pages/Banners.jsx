import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { buildImageUrl } from "../services/image.helper";

import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner
} from "../services/banner.service";

export default function Banner() {

  const [banners, setBanners] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      CTA_text: "",
      CTA_link: "",
      status: true,
      order: ""
    }
  });

  const fetchBanners = async () => {
    const data = await getBanners();
    setBanners(data);
  };

  useEffect(() => { fetchBanners(); }, []);

  const onSubmit = async (values) => {
    const fd = new FormData();

    if (values.image?.[0]) fd.append("image", values.image[0]);
    fd.append("CTA_text", values.CTA_text);
    fd.append("CTA_link", values.CTA_link);
    fd.append("status", values.status);
    fd.append("order", values.order);

    editId ? await updateBanner(editId, fd) : await createBanner(fd);

    reset();
    setEditId(null);
    setShowForm(false);
    fetchBanners();
  };

  const handleEdit = (b) => {
    setEditId(b.id);
    setShowForm(true);
    reset({
      CTA_text: b.CTA_text,
      CTA_link: b.CTA_link,
      status: b.status,
      order: b.order
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete banner?")) return;
    await deleteBanner(id);
    fetchBanners();
  };

  return (
    <div className="page-wrapper">

      {!showForm ? (
        <>
          {/* HEADER */}
          <div className="card-header-row">
            <h2>Banners</h2>

            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              Add Banner
            </button>
          </div>

          {/* TABLE (scroll only table) */}
          <div className="table-scroll">
            <table className="table-pro table-admin">
              <thead>
                <tr>
                  <th className="table-img">Preview</th>
                  <th className="table-name">CTA Text</th>
                  <th className="table-text">Link</th>
                  <th>Status</th>
                  <th>Order</th>
                  <th className="table-actions">Actions</th>
                </tr>
              </thead>

              <tbody>
                {banners.map(b => (
                  <tr key={b.id}>
                    <td className="table-img">
                      <img src={buildImageUrl(b.image)} width={70} />
                    </td>

                    <td>{b.CTA_text}</td>
                    <td>{b.CTA_link}</td>
                    <td>{b.status ? "Active" : "Inactive"}</td>
                    <td>{b.order}</td>

                    <td className="table-actions">
                      <button className="btn btn-warning btn-sm" onClick={() => handleEdit(b)}>
                        Edit
                      </button>

                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(b.id)}>
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
          <h4>{editId ? "Update Banner" : "Add Banner"}</h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-2">

              <div className="col-md-6">
                <label>CTA Text</label>
                <input className="form-control" {...register("CTA_text")} />
              </div>

              <div className="col-md-6">
                <label>CTA Link</label>
                <input className="form-control" {...register("CTA_link")} />
              </div>

              <div className="col-md-6">
                <label>Order</label>
                <input className="form-control" {...register("order")} />
              </div>

              <div className="col-md-6">
                <label>Status</label>
                <select className="form-control" {...register("status")}>
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>

              <div className="col-md-12 mt-2">
                <label>Banner Image</label>
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
                {editId ? "Save Changes" : "Add Banner"}
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
