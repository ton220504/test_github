module.exports = (req, res, next)=>{
    const {body} = req;
    const errors = [];
    schema.forEach(field=>{
        if(!body[field]) errors.push(`${field} is required`);
    });
    if(errors.length) return res.status(400).json({success:false, errors});
    next();
}