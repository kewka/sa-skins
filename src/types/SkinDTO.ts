/**
 * Interface describing skin data.
 */
export default interface SkinDTO {
  /** Id. */
  id: number;
  /** Image. */
  image: string;
  /** Model file name. */
  model: string;
  /** Type. */
  type: string;
  /** Location. */
  location: string;
  /** Gender. */
  gender: 'Male' | 'Female';
}
