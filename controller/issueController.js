import Issue from "../models/issueModel.js";

// Create a new issue complaint

const createIssue  = async(req, res) => {
    try{
        const { name, title, description} = req.body;
        const issue =  new Issue({
            name,
            title,
            description,
            user: req.user._id
          });
          await issue.save()

          res.status(201).json({ message: 'Issue complaint created successfully', issue });
    }catch(err){
        throw new Error(err)
    }
}

// Get all issue complaints
const getIssue  = async(req, res) => {
    try{
        const issues = await Issue.find();
        res.json({ issues });

          res.status(201).json({ message: 'Issue complaint created successfully', issue });
    }catch(err){
        throw new Error(err)
    }
}





// Get a specific issue complaint by ID
const getIssueId = async (req, res) => {
  try {
    const issueId = req.params.id;
    const issue = await Issue.findById(issueId);

    if (!issue) {
      res.status(400).json({ message: 'Issue complaint not found' });
    } else {
      res.json({message: 'successful', issue });
    }
  } catch (err) {
    throw new Error(err)
  }
};

export{createIssue, getIssue, getIssueId}
