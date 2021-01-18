module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      published: Boolean,
      ativo: String,
      descricao: String,
      modelo: String,
      status: String,
      niveldesaude: String,
      responsavel: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};