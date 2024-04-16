import { convertDate } from '../../services/convert-date';
import { Comments } from '../../types/types';

interface MoviePageReviewsProps {
  comments: Comments;
}

const MoviePageReviews = ({ comments }: MoviePageReviewsProps): JSX.Element => (
  <div className='film-card__reviews film-card__row'>
    <div className='film-card__reviews-col'>
      {comments.map((comment, index) => {
        if (index % 2 === 0) {
          return (
            <div key={comment.id} className='review'>
              <blockquote className='review__quote'>
                <p className='review__text'>{comment.comment}</p>

                <footer className='review__details'>
                  <cite className='review__author'>{comment.user.name}</cite>
                  <time className='review__date' dateTime={comment.date}>
                    {convertDate(comment.date)}
                  </time>
                </footer>
              </blockquote>

              <div className='review__rating'>{comment.rating}</div>
            </div>
          );
        }
      })}
    </div>
    <div className='film-card__reviews-col'>
      {comments.map((comment, index) => {
        if (index % 2 !== 0) {
          return (
            <div key={comment.id} className='review'>
              <blockquote className='review__quote'>
                <p className='review__text'>{comment.comment}</p>

                <footer className='review__details'>
                  <cite className='review__author'>{comment.user.name}</cite>
                  <time className='review__date' dateTime={comment.date}>
                    {convertDate(comment.date)}
                  </time>
                </footer>
              </blockquote>

              <div className='review__rating'>{comment.rating}</div>
            </div>
          );
        }
      })}
    </div>
  </div>
);
export default MoviePageReviews;
