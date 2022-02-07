import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { Category } from "../../types/Category";

interface Props {
  category?: Category;
}

export const Form: FunctionComponent<Props> = ({ category }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(category["@id"], { method: "DELETE" });
      router.push("/categories");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>
        {category ? `Edit Category ${category["@id"]}` : `Create Category`}
      </h1>
      <Formik
        initialValues={category ? { ...category } : new Category()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/categories" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/categories");
          } catch (error) {
            setStatus({
              isValid: false,
              msg: `${error.defaultErrorMsg}`,
            });
            setErrors(error.fields);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-control-label" htmlFor="_name">
                name
              </label>
              <input
                name="name"
                id="_name"
                value={values.name ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.name && touched.name ? " is-invalid" : ""
                }`}
                aria-invalid={errors.name && touched.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="name" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_category">
                category
              </label>
              <input
                name="category"
                id="_category"
                value={values.category ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.category && touched.category ? " is-invalid" : ""
                }`}
                aria-invalid={errors.category && touched.category}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="category"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_image">
                image
              </label>
              <input
                name="image"
                id="_image"
                value={values.image ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.image && touched.image ? " is-invalid" : ""
                }`}
                aria-invalid={errors.image && touched.image}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="image"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_description">
                description
              </label>
              <input
                name="description"
                id="_description"
                value={values.description ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.description && touched.description ? " is-invalid" : ""
                }`}
                aria-invalid={errors.description && touched.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="description"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_userId">
                userId
              </label>
              <input
                name="userId"
                id="_userId"
                value={values.userId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.userId && touched.userId ? " is-invalid" : ""
                }`}
                aria-invalid={errors.userId && touched.userId}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="userId"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_lastModified">
                lastModified
              </label>
              <input
                name="lastModified"
                id="_lastModified"
                value={values.lastModified ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.lastModified && touched.lastModified
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={errors.lastModified && touched.lastModified}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="lastModified"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_active">
                active
              </label>
              <input
                name="active"
                id="_active"
                value={values.active ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.active && touched.active ? " is-invalid" : ""
                }`}
                aria-invalid={errors.active && touched.active}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="active"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_seq">
                seq
              </label>
              <input
                name="seq"
                id="_seq"
                value={values.seq ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.seq && touched.seq ? " is-invalid" : ""
                }`}
                aria-invalid={errors.seq && touched.seq}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="seq" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_brandid">
                brandid
              </label>
              <input
                name="brandid"
                id="_brandid"
                value={values.brandid ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.brandid && touched.brandid ? " is-invalid" : ""
                }`}
                aria-invalid={errors.brandid && touched.brandid}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="brandid"
            />

            {status && status.msg && (
              <div
                className={`alert ${
                  status.isValid ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Link href="/categories">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {category && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
