import Axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Recipe = () => {
  const [recipe, setRecipe] = useState([]);
  const navigate = useNavigate();
  const handleDelete = async (id, nama) => {
    if (window.confirm(`yakin mau hapus prodi: ${nama} ?`)) {
      try {
        await Axios.delete(`https://bukuresep-api.vercel.app/recipe/${id}`).then(
          window.location.reload()
        );
      } catch (error) {
        alert(error);
      }
    }
  };
  useEffect(() => {
    Axios.get("https://bukuresep-api.vercel.app/recipe")
      .then((res) => {
        const { data } = res;
        setRecipe(data);
        // console.log(res);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <>
      <h2>Halama List Prodi</h2>
      {/* <button
        className="btn btn-primary"
        onClick={() => navigate("/recipe/create")}
      >
        {" "}
        +Tambah
      </button> */}
      <table className="table table-striped">
        <thead>
          <tr >
            <th>Nama Resep</th>
            <th>Nama Bahan</th>
            <th>#</th>
          </tr>
        </thead>

        <tbody>
          {recipe &&
            recipe.map((rp, index) => {
              return (
                <tr key={index}>
                  <td>{rp.namaResep}</td>
                  <td>{rp.bahan}</td>
                  {/* <td>
                    <NavLink
                      to={`/`}
                      className="btn btn-sm btn-warning"
                    >
                      Ubah
                    </NavLink>{" "}
                    &nbsp;
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(rp._id, rp.namaResep)}
                    >
                      Hapus
                    </button>
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Recipe;
