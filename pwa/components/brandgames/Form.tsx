import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { BrandGames } from "../../types/BrandGames";

interface Props {
  brandgames?: BrandGames;
}

export const Form: FunctionComponent<Props> = ({ brandgames }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(brandgames["@id"], { method: "DELETE" });
      router.push("/brand_games");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>
        {brandgames
          ? `Edit BrandGames ${brandgames["@id"]}`
          : `Create BrandGames`}
      </h1>
      <Formik
        initialValues={brandgames ? { ...brandgames } : new BrandGames()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/brand_games" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/brand_games");
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
              <label className="form-control-label" htmlFor="_hot">
                hot
              </label>
              <input
                name="hot"
                id="_hot"
                value={values.hot ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.hot && touched.hot ? " is-invalid" : ""
                }`}
                aria-invalid={errors.hot && touched.hot}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="hot" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_new">
                new
              </label>
              <input
                name="new"
                id="_new"
                value={values.new ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.new && touched.new ? " is-invalid" : ""
                }`}
                aria-invalid={errors.new && touched.new}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="new" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_subCategory">
                subCategory
              </label>
              <input
                name="subCategory"
                id="_subCategory"
                value={values.subCategory ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.subCategory && touched.subCategory ? " is-invalid" : ""
                }`}
                aria-invalid={errors.subCategory && touched.subCategory}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="subCategory"
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
            <div className="form-group">
              <label className="form-control-label" htmlFor="_game_codes">
                game_codes
              </label>
              <input
                name="game_codes"
                id="_game_codes"
                value={values.game_codes ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.game_codes && touched.game_codes ? " is-invalid" : ""
                }`}
                aria-invalid={errors.game_codes && touched.game_codes}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="game_codes"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_gameCodes">
                gameCodes
              </label>
              <input
                name="gameCodes"
                id="_gameCodes"
                value={values.gameCodes ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.gameCodes && touched.gameCodes ? " is-invalid" : ""
                }`}
                aria-invalid={errors.gameCodes && touched.gameCodes}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="gameCodes"
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
      <Link href="/brand_games">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {brandgames && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
