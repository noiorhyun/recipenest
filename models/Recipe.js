import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { 
  timestamps: true, // 自动添加 createdAt 和 updatedAt
  toJSON: { virtuals: true }, // 虚拟字段转换
  toObject: { virtuals: true }
});

// 添加虚拟字段（示例）
recipeSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('zh-CN');
});

// 更安全的模型获取方式
const Recipe = mongoose.models?.Recipe || mongoose.model('Recipe', recipeSchema);

export default Recipe;
