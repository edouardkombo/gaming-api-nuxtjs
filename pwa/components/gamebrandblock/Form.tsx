import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { GameBrandBlock } from "../../types/GameBrandBlock";

interface Props {
  gamebrandblock?: GameBrandBlock;
}

export const Form: FunctionComponent<Props> = ({ gamebrandblock }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(gamebrandblock["@id"], { method: "DELETE" });
      router.push("/game_brand_blocks");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>
        {gamebrandblock
          ? `Edit GameBrandBlock ${gamebrandblock["@id"]}`
          : `Create GameBrandBlock`}
      </h1>
      <Formik
        initialValues={
          gamebrandblock ? { ...gamebrandblock } : new GameBrandBlock()
        }
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/game_brand_blocks" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/game_brand_blocks");
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
              <label className="form-control-label" htmlFor="_launchcode">
                launchcode
              </label>
              <input
                name="launchcode"
                id="_launchcode"
                value={values.launchcode ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.launchcode && touched.launchcode ? " is-invalid" : ""
                }`}
                aria-invalid={errors.launchcode && touched.launchcode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="launchcode"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_blockedDate">
                blockedDate
              </label>
              <input
                name="blockedDate"
                id="_blockedDate"
                value={values.blockedDate ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.blockedDate && touched.blockedDate ? " is-invalid" : ""
                }`}
                aria-invalid={errors.blockedDate && touched.blockedDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="blockedDate"
            />
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
      <Link href="/game_brand_blocks">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {gamebrandblock && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
