import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { Game } from "../../types/Game";

interface Props {
  game?: Game;
}

export const Form: FunctionComponent<Props> = ({ game }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(game["@id"], { method: "DELETE" });
      router.push("/games");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{game ? `Edit Game ${game["@id"]}` : `Create Game`}</h1>
      <Formik
        initialValues={game ? { ...game } : new Game()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/games" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/games");
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
              <label className="form-control-label" htmlFor="_publisher">
                publisher
              </label>
              <input
                name="publisher"
                id="_publisher"
                value={values.publisher ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.publisher && touched.publisher ? " is-invalid" : ""
                }`}
                aria-invalid={errors.publisher && touched.publisher}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="publisher"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_width">
                width
              </label>
              <input
                name="width"
                id="_width"
                value={values.width ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.width && touched.width ? " is-invalid" : ""
                }`}
                aria-invalid={errors.width && touched.width}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="width"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_height">
                height
              </label>
              <input
                name="height"
                id="_height"
                value={values.height ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.height && touched.height ? " is-invalid" : ""
                }`}
                aria-invalid={errors.height && touched.height}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="height"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_disclaimer">
                disclaimer
              </label>
              <input
                name="disclaimer"
                id="_disclaimer"
                value={values.disclaimer ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.disclaimer && touched.disclaimer ? " is-invalid" : ""
                }`}
                aria-invalid={errors.disclaimer && touched.disclaimer}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="disclaimer"
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
              <label className="form-control-label" htmlFor="_desktop">
                desktop
              </label>
              <input
                name="desktop"
                id="_desktop"
                value={values.desktop ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.desktop && touched.desktop ? " is-invalid" : ""
                }`}
                aria-invalid={errors.desktop && touched.desktop}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="desktop"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_mobile">
                mobile
              </label>
              <input
                name="mobile"
                id="_mobile"
                value={values.mobile ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.mobile && touched.mobile ? " is-invalid" : ""
                }`}
                aria-invalid={errors.mobile && touched.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="mobile"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_gameTypeId">
                gameTypeId
              </label>
              <input
                name="gameTypeId"
                id="_gameTypeId"
                value={values.gameTypeId ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.gameTypeId && touched.gameTypeId ? " is-invalid" : ""
                }`}
                aria-invalid={errors.gameTypeId && touched.gameTypeId}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="gameTypeId"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_min">
                min
              </label>
              <input
                name="min"
                id="_min"
                value={values.min ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.min && touched.min ? " is-invalid" : ""
                }`}
                aria-invalid={errors.min && touched.min}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="min" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_max">
                max
              </label>
              <input
                name="max"
                id="_max"
                value={values.max ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.max && touched.max ? " is-invalid" : ""
                }`}
                aria-invalid={errors.max && touched.max}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="max" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_gamelimit">
                gamelimit
              </label>
              <input
                name="gamelimit"
                id="_gamelimit"
                value={values.gamelimit ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.gamelimit && touched.gamelimit ? " is-invalid" : ""
                }`}
                aria-invalid={errors.gamelimit && touched.gamelimit}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="gamelimit"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_funSupported">
                funSupported
              </label>
              <input
                name="funSupported"
                id="_funSupported"
                value={values.funSupported ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.funSupported && touched.funSupported
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={errors.funSupported && touched.funSupported}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="funSupported"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_iframe">
                iframe
              </label>
              <input
                name="iframe"
                id="_iframe"
                value={values.iframe ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.iframe && touched.iframe ? " is-invalid" : ""
                }`}
                aria-invalid={errors.iframe && touched.iframe}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="iframe"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_provider">
                provider
              </label>
              <input
                name="provider"
                id="_provider"
                value={values.provider ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.provider && touched.provider ? " is-invalid" : ""
                }`}
                aria-invalid={errors.provider && touched.provider}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="provider"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_dateAdded">
                dateAdded
              </label>
              <input
                name="dateAdded"
                id="_dateAdded"
                value={values.dateAdded ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.dateAdded && touched.dateAdded ? " is-invalid" : ""
                }`}
                aria-invalid={errors.dateAdded && touched.dateAdded}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="dateAdded"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_rtp">
                rtp
              </label>
              <input
                name="rtp"
                id="_rtp"
                value={values.rtp ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.rtp && touched.rtp ? " is-invalid" : ""
                }`}
                aria-invalid={errors.rtp && touched.rtp}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="rtp" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_jackpot">
                jackpot
              </label>
              <input
                name="jackpot"
                id="_jackpot"
                value={values.jackpot ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.jackpot && touched.jackpot ? " is-invalid" : ""
                }`}
                aria-invalid={errors.jackpot && touched.jackpot}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="jackpot"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_seoName">
                seoName
              </label>
              <input
                name="seoName"
                id="_seoName"
                value={values.seoName ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.seoName && touched.seoName ? " is-invalid" : ""
                }`}
                aria-invalid={errors.seoName && touched.seoName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="seoName"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_help">
                help
              </label>
              <input
                name="help"
                id="_help"
                value={values.help ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.help && touched.help ? " is-invalid" : ""
                }`}
                aria-invalid={errors.help && touched.help}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="help" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_rowCustomImage">
                rowCustomImage
              </label>
              <input
                name="rowCustomImage"
                id="_rowCustomImage"
                value={values.rowCustomImage ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.rowCustomImage && touched.rowCustomImage
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={errors.rowCustomImage && touched.rowCustomImage}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="rowCustomImage"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_reels">
                reels
              </label>
              <input
                name="reels"
                id="_reels"
                value={values.reels ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.reels && touched.reels ? " is-invalid" : ""
                }`}
                aria-invalid={errors.reels && touched.reels}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="reels"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_rows">
                rows
              </label>
              <input
                name="rows"
                id="_rows"
                value={values.rows ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.rows && touched.rows ? " is-invalid" : ""
                }`}
                aria-invalid={errors.rows && touched.rows}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="rows" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_lines">
                lines
              </label>
              <input
                name="lines"
                id="_lines"
                value={values.lines ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.lines && touched.lines ? " is-invalid" : ""
                }`}
                aria-invalid={errors.lines && touched.lines}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="lines"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_volatility">
                volatility
              </label>
              <input
                name="volatility"
                id="_volatility"
                value={values.volatility ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.volatility && touched.volatility ? " is-invalid" : ""
                }`}
                aria-invalid={errors.volatility && touched.volatility}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="volatility"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_isState">
                isState
              </label>
              <input
                name="isState"
                id="_isState"
                value={values.isState ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.isState && touched.isState ? " is-invalid" : ""
                }`}
                aria-invalid={errors.isState && touched.isState}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="isState"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_gameProvider">
                gameProvider
              </label>
              <input
                name="gameProvider"
                id="_gameProvider"
                value={values.gameProvider ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.gameProvider && touched.gameProvider
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={errors.gameProvider && touched.gameProvider}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="gameProvider"
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
              <label className="form-control-label" htmlFor="_details">
                details
              </label>
              <input
                name="details"
                id="_details"
                value={values.details ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.details && touched.details ? " is-invalid" : ""
                }`}
                aria-invalid={errors.details && touched.details}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="details"
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
      <Link href="/games">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {game && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
