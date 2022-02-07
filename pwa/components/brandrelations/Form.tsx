import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { BrandRelations } from "../../types/BrandRelations";

interface Props {
  brandrelations?: BrandRelations;
}

export const Form: FunctionComponent<Props> = ({ brandrelations }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(brandrelations["@id"], { method: "DELETE" });
      router.push("/brand_relations");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>
        {brandrelations
          ? `Edit BrandRelations ${brandrelations["@id"]}`
          : `Create BrandRelations`}
      </h1>
      <Formik
        initialValues={
          brandrelations ? { ...brandrelations } : new BrandRelations()
        }
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/brand_relations" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/brand_relations");
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
              <label className="form-control-label" htmlFor="_licensee">
                licensee
              </label>
              <input
                name="licensee"
                id="_licensee"
                value={values.licensee ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.licensee && touched.licensee ? " is-invalid" : ""
                }`}
                aria-invalid={errors.licensee && touched.licensee}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="licensee"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_games">
                games
              </label>
              <input
                name="games"
                id="_games"
                value={values.games ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.games && touched.games ? " is-invalid" : ""
                }`}
                aria-invalid={errors.games && touched.games}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="games"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_categories">
                categories
              </label>
              <input
                name="categories"
                id="_categories"
                value={values.categories ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.categories && touched.categories ? " is-invalid" : ""
                }`}
                aria-invalid={errors.categories && touched.categories}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="categories"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_blockedGames">
                blockedGames
              </label>
              <input
                name="blockedGames"
                id="_blockedGames"
                value={values.blockedGames ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.blockedGames && touched.blockedGames
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={errors.blockedGames && touched.blockedGames}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="blockedGames"
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
      <Link href="/brand_relations">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {brandrelations && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
