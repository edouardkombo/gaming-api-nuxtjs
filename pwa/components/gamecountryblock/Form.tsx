import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { GameCountryBlock } from "../../types/GameCountryBlock";

interface Props {
  gamecountryblock?: GameCountryBlock;
}

export const Form: FunctionComponent<Props> = ({ gamecountryblock }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(gamecountryblock["@id"], { method: "DELETE" });
      router.push("/game_country_blocks");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>
        {gamecountryblock
          ? `Edit GameCountryBlock ${gamecountryblock["@id"]}`
          : `Create GameCountryBlock`}
      </h1>
      <Formik
        initialValues={
          gamecountryblock ? { ...gamecountryblock } : new GameCountryBlock()
        }
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/game_country_blocks" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/game_country_blocks");
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
              <label className="form-control-label" htmlFor="_country">
                country
              </label>
              <input
                name="country"
                id="_country"
                value={values.country ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.country && touched.country ? " is-invalid" : ""
                }`}
                aria-invalid={errors.country && touched.country}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="country"
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
              <label className="form-control-label" htmlFor="_loggedOut">
                loggedOut
              </label>
              <input
                name="loggedOut"
                id="_loggedOut"
                value={values.loggedOut ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.loggedOut && touched.loggedOut ? " is-invalid" : ""
                }`}
                aria-invalid={errors.loggedOut && touched.loggedOut}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="loggedOut"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_unfunded">
                unfunded
              </label>
              <input
                name="unfunded"
                id="_unfunded"
                value={values.unfunded ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.unfunded && touched.unfunded ? " is-invalid" : ""
                }`}
                aria-invalid={errors.unfunded && touched.unfunded}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="unfunded"
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
      <Link href="/game_country_blocks">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {gamecountryblock && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
