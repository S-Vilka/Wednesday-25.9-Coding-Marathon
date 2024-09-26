import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";

const EditJobPage = ({ updateJobSubmit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: job, loading, error } = useFetch(`/api/jobs/${id}`);

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    location: "",
    description: "",
    salary: "",
    companyName: "",
    companyDescription: "",
    contactEmail: "",
    contactPhone: "",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        type: job.type,
        location: job.location,
        description: job.description,
        salary: job.salary,
        companyName: job.company.name,
        companyDescription: job.company.description,
        contactEmail: job.company.contactEmail,
        contactPhone: job.company.contactPhone,
      });
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await updateJobSubmit({
        id,
        ...formData,
        company: {
          name: formData.companyName,
          description: formData.companyDescription,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone,
        },
      });
      toast.success("Job Updated Successfully");
      navigate(`/jobs/${id}`);
    } catch (error) {
      toast.error("Failed to update job");
      console.error("Error updating job:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Update Job
            </h2>

            {Object.keys(formData).map((key) => (
              <div className="mb-4" key={key}>
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor={key}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3"
                  required
                />
              </div>
            ))}

            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Job
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditJobPage;
