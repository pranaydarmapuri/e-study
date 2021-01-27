import Subject from '../../_models/Subject.model'
// --------------------------------------//> Delete Subject ///
export default async (req, res) => Subject.findByIdAndDelete(
  req.params.id,
  async (err, data) => {
    err
      ? res.status(400).json(err)
      : res.json({ message: 'Subject deleted.' })
  }
)