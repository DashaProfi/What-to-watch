import { Link, Navigate } from 'react-router-dom';
import {
  AppRoutes,
  AuthorizationStatus,
  MAX_LENGTH,
  MIN_LENGTH,
  Ratings,
} from '../../const/const';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../types/store';
import { logoutUser } from '../../store/user-slice';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { SendStatus } from '../../types/types';
import { postComment } from '../../store/comments-slice';

const AddReview = (): JSX.Element => {
  const { oneFilm } = useSelector((state: AppState) => state.films);
  const { authorizationStatus } = useSelector((state: AppState) => state.user);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
  const { sendStatus, errorMessage } = useSelector(
    (state: AppState) => state.comments
  );
  const dispatch: AppDispatch = useDispatch();
  const commentRating = Number(rating);

  const handleClickLogout = () => {
    dispatch(logoutUser());
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postComment({ comment, rating: commentRating }));
  };

  const isFormDataValue = (comment: string, rating: string): boolean => {
    return (
      comment.length >= MIN_LENGTH &&
      comment.length <= MAX_LENGTH &&
      Number(rating) > 0 &&
      comment !== undefined &&
      rating !== undefined
    );
  };
  useEffect(
    () =>
      setIsDisabledSubmit(
        !isFormDataValue(comment, rating) || sendStatus === SendStatus.Pending
      ),
    [comment, rating, sendStatus]
  );

  useEffect(() => {
    if (sendStatus === SendStatus.Fulfilled) {
      setComment('');
      setRating('');
    }
  }, [sendStatus]);

  return (
    <section className='film-card film-card--full'>
      {authorizationStatus === AuthorizationStatus.AUTH ? (
        <>
          <div className='film-card__header'>
            <div className='film-card__bg'>
              <img src={oneFilm?.backgroundImage} alt={oneFilm?.name} />
            </div>

            <h1 className='visually-hidden'>WTW</h1>

            <header className='page-header'>
              <div className='logo'>
                <Link to={AppRoutes.Main} className='logo__link'>
                  <span className='logo__letter logo__letter--1'>W</span>
                  <span className='logo__letter logo__letter--2'>T</span>
                  <span className='logo__letter logo__letter--3'>W</span>
                </Link>
              </div>

              <nav className='breadcrumbs'>
                <ul className='breadcrumbs__list'>
                  <li className='breadcrumbs__item'>
                    <Link to='' className='breadcrumbs__link'>
                      {oneFilm?.name}
                    </Link>
                  </li>
                  <li className='breadcrumbs__item'>
                    <Link to='' className='breadcrumbs__link'>
                      Add review
                    </Link>
                  </li>
                </ul>
              </nav>

              <ul className='user-block'>
                {authorizationStatus === AuthorizationStatus.AUTH ? (
                  <>
                    <li className='user-block__item'>
                      <div className='user-block__avatar'>
                        <img
                          src='img/avatar.jpg'
                          alt='User avatar'
                          width='63'
                          height='63'
                        />
                      </div>
                    </li>
                    <li className='user-block__item'>
                      <Link
                        to=''
                        className='user-block__link'
                        onClick={handleClickLogout}
                      >
                        Sign out
                      </Link>
                    </li>
                  </>
                ) : (
                  <Link to={AppRoutes.SignIn} className='user-block__link'>
                    Sign in
                  </Link>
                )}
              </ul>
            </header>

            <div className='film-card__poster film-card__poster--small'>
              <img
                src={oneFilm?.posterImage}
                alt={oneFilm?.name}
                width='218'
                height='327'
              />
            </div>
          </div>

          <div className='add-review'>
            <form
              onSubmit={handleSubmit}
              action='#'
              className='add-review__form'
            >
              <div className='rating'>
                <div className='rating__stars'>
                  {Ratings.map((rate, index) => (
                    <>
                      <input
                        className='rating__input'
                        id={`${rate} stars`}
                        type='radio'
                        name='rating'
                        value={rate}
                        checked={5 - Number(rating) === index}
                        onClick={(evt: React.MouseEvent<HTMLInputElement>) => {
                          const ratingInput = evt.target as HTMLInputElement;
                          setRating(ratingInput.value);
                        }}
                      />
                      <label
                        className='rating__label'
                        htmlFor={`${rate} stars`}
                      >
                        Rating {rate}
                      </label>
                    </>
                  ))}
                </div>
              </div>

              <div className='add-review__text'>
                <textarea
                  className='add-review__textarea'
                  name='review-text'
                  id='review-text'
                  placeholder='Review text'
                  minLength={MIN_LENGTH}
                  maxLength={MAX_LENGTH}
                  value={comment}
                  onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
                    setComment(target.value);
                  }}
                />
                <div className='add-review__submit'>
                  <button
                    className='add-review__btn'
                    type='submit'
                    disabled={isDisabledSubmit}
                  >
                    Post
                  </button>
                </div>
              </div>
              {sendStatus === SendStatus.Rejected && errorMessage && (
                <div style={{ color: 'red', marginTop: '15px' }}>
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </>
      ) : (
        <Navigate to={AppRoutes.SignIn} />
      )}
    </section>
  );
};

export default AddReview;
