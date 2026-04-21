import axios from "axios";

const API = "http://localhost:5000/api";

export default function AddProduct({
  form,
  setForm,
  handleImage,
  handleAdd,
  loading,
}) {
  return (
    <div>
      <h2>Add Product</h2>

      <div className="form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: Number(e.target.value),
            })
          }
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImage}
        />

        {form.images.map((img, i) => (
          <img key={i} src={img} className="preview" />
        ))}

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <button onClick={handleAdd} disabled={loading}>
        {loading
            ? "Saving..."
            : form._id ? "Update Product" : "Add Product"}
        </button>
      </div>
    </div>
  );
}