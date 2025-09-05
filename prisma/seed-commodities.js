const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const commoditiesData = {
  "Crops": {
    description: "Agricultural crops and grains",
    icon: "🌾",
    sortOrder: 1,
    commodities: [
      { name: "Rice", aliases: ["Paddy Rice", "White Rice"], units: ["per kg", "per bag (50kg)", "per bag (100kg)", "per ton"] },
      { name: "Maize", aliases: ["Corn", "Yellow Corn"], units: ["per kg", "per bag (50kg)", "per bag (100kg)", "per ton"] },
      { name: "Cassava", aliases: ["Tapioca"], units: ["per kg", "per tuber", "per bag (50kg)", "per ton"] },
      { name: "Yam", aliases: ["Sweet Yam"], units: ["per tuber", "per kg", "per bag"] },
      { name: "Plantain", aliases: ["Green Plantain"], units: ["per bunch", "per finger", "per kg"] },
      { name: "Beans", aliases: ["Black-eyed Peas", "Cowpeas"], units: ["per kg", "per bag (50kg)", "per ton"] },
      { name: "Tomato", aliases: ["Fresh Tomatoes"], units: ["per kg", "per basket", "per crate"] },
      { name: "Pepper", aliases: ["Hot Pepper", "Sweet Pepper"], units: ["per kg", "per basket"] },
      { name: "Onion", aliases: ["Red Onion", "White Onion"], units: ["per kg", "per bag", "per basket"] },
      { name: "Garlic", aliases: [], units: ["per kg", "per bulb"] },
      { name: "Ginger", aliases: [], units: ["per kg", "per basket"] },
      { name: "Cocoa", aliases: ["Cocoa Beans"], units: ["per kg", "per bag (50kg)", "per ton"] },
      { name: "Groundnut", aliases: ["Peanuts"], units: ["per kg", "per bag (50kg)", "per ton"] },
      { name: "Millet", aliases: [], units: ["per kg", "per bag (50kg)", "per ton"] },
      { name: "Sorghum", aliases: [], units: ["per kg", "per bag (50kg)", "per ton"] },
      { name: "Wheat", aliases: [], units: ["per kg", "per bag (50kg)", "per ton"] },
      { name: "Oil Palm", aliases: ["Palm Fruit"], units: ["per kg", "per ton"] },
      { name: "Palm Oil", aliases: [], units: ["per liter", "per gallon", "per barrel"] },
      { name: "Coconut", aliases: [], units: ["per piece", "per bag", "per ton"] },
      { name: "Cashew", aliases: ["Cashew Nuts"], units: ["per kg", "per bag (50kg)", "per ton"] },
    ]
  },
  "Animals": {
    description: "Livestock and cattle",
    icon: "🐄",
    sortOrder: 2,
    commodities: [
      { name: "Cattle", aliases: ["Cows", "Bulls"], units: ["per head", "per kg (live weight)"] },
      { name: "Goat", aliases: ["Goats"], units: ["per head", "per kg (live weight)"] },
      { name: "Sheep", aliases: ["Ram"], units: ["per head", "per kg (live weight)"] },
      { name: "Pig", aliases: ["Swine"], units: ["per head", "per kg (live weight)"] },
      { name: "Rabbit", aliases: [], units: ["per head", "per kg (live weight)"] },
      { name: "Beef", aliases: ["Fresh Beef"], units: ["per kg"] },
      { name: "Mutton", aliases: ["Goat Meat"], units: ["per kg"] },
      { name: "Pork", aliases: ["Pig Meat"], units: ["per kg"] },
    ]
  },
  "Poultry": {
    description: "Birds and poultry products",
    icon: "🐔",
    sortOrder: 3,
    commodities: [
      { name: "Chicken", aliases: ["Broiler", "Layer"], units: ["per head", "per kg (live weight)"] },
      { name: "Turkey", aliases: [], units: ["per head", "per kg (live weight)"] },
      { name: "Duck", aliases: [], units: ["per head", "per kg (live weight)"] },
      { name: "Guinea Fowl", aliases: [], units: ["per head", "per kg (live weight)"] },
      { name: "Eggs", aliases: ["Chicken Eggs"], units: ["per crate (30 pieces)", "per piece"] },
      { name: "Chicken Meat", aliases: ["Broiler Meat"], units: ["per kg"] },
      { name: "Turkey Meat", aliases: [], units: ["per kg"] },
    ]
  },
  "Machineries": {
    description: "Farm equipment and machinery",
    icon: "🚜",
    sortOrder: 4,
    commodities: [
      { name: "Tractor", aliases: ["Farm Tractor"], units: ["per unit"] },
      { name: "Plough", aliases: ["Disc Plough"], units: ["per unit"] },
      { name: "Harrow", aliases: [], units: ["per unit"] },
      { name: "Cultivator", aliases: [], units: ["per unit"] },
      { name: "Planter", aliases: ["Seed Planter"], units: ["per unit"] },
      { name: "Harvester", aliases: ["Combine Harvester"], units: ["per unit"] },
      { name: "Thresher", aliases: [], units: ["per unit"] },
      { name: "Water Pump", aliases: ["Irrigation Pump"], units: ["per unit"] },
      { name: "Generator", aliases: ["Power Generator"], units: ["per unit"] },
      { name: "Sprayer", aliases: ["Chemical Sprayer"], units: ["per unit"] },
      { name: "Mower", aliases: ["Grass Cutter"], units: ["per unit"] },
      { name: "Wheelbarrow", aliases: [], units: ["per unit"] },
    ]
  },
  "Accessories": {
    description: "Farm tools, inputs and accessories",
    icon: "🔧",
    sortOrder: 5,
    commodities: [
      { name: "Fertilizer", aliases: ["NPK", "Organic Fertilizer"], units: ["per kg", "per bag (50kg)"] },
      { name: "Pesticide", aliases: ["Insecticide", "Herbicide"], units: ["per liter", "per kg"] },
      { name: "Seeds", aliases: ["Hybrid Seeds"], units: ["per kg", "per packet"] },
      { name: "Seedlings", aliases: ["Plantlets"], units: ["per piece", "per tray"] },
      { name: "Hand Tools", aliases: ["Hoe", "Cutlass", "Spade"], units: ["per unit"] },
      { name: "Irrigation Equipment", aliases: ["Drip Lines", "Sprinklers"], units: ["per unit", "per meter"] },
      { name: "Storage Bags", aliases: ["Jute Bags", "Polypropylene Bags"], units: ["per piece", "per bundle"] },
      { name: "Greenhouse Materials", aliases: ["Plastic Sheets"], units: ["per square meter"] },
      { name: "Animal Feed", aliases: ["Livestock Feed", "Poultry Feed"], units: ["per kg", "per bag (25kg)", "per bag (50kg)"] },
      { name: "Farm Chemicals", aliases: ["Growth Regulators"], units: ["per liter", "per kg"] },
      { name: "Packaging Materials", aliases: ["Crates", "Cartons"], units: ["per piece", "per bundle"] },
      { name: "Farm Clothing", aliases: ["Boots", "Gloves"], units: ["per piece", "per pair"] },
    ]
  }
};

async function seedCommodities() {
  console.log('🌾 Starting commodity seeding...');
  
  try {
    // Clear existing data
    await prisma.commodity.deleteMany();
    await prisma.commodityCategory.deleteMany();
    
    console.log('✅ Cleared existing commodity data');
    
    // Create categories and commodities
    for (const [categoryName, categoryData] of Object.entries(commoditiesData)) {
      console.log(`📂 Creating category: ${categoryName}`);
      
      const category = await prisma.commodityCategory.create({
        data: {
          name: categoryName,
          description: categoryData.description,
          icon: categoryData.icon,
          sortOrder: categoryData.sortOrder,
          isActive: true,
        }
      });
      
      console.log(`✅ Created category: ${category.name} (${category.id})`);
      
      // Create commodities for this category
      for (let i = 0; i < categoryData.commodities.length; i++) {
        const commodityData = categoryData.commodities[i];
        
        const commodity = await prisma.commodity.create({
          data: {
            name: commodityData.name,
            categoryId: category.id,
            aliases: commodityData.aliases,
            units: commodityData.units,
            sortOrder: i + 1,
            isActive: true,
          }
        });
        
        console.log(`  ➕ Created commodity: ${commodity.name}`);
      }
      
      console.log(`✅ Created ${categoryData.commodities.length} commodities for ${categoryName}`);
    }
    
    console.log('🎉 Commodity seeding completed successfully!');
    
    // Display summary
    const categoriesCount = await prisma.commodityCategory.count();
    const commoditiesCount = await prisma.commodity.count();
    
    console.log(`📊 Summary:`);
    console.log(`   - Categories: ${categoriesCount}`);
    console.log(`   - Commodities: ${commoditiesCount}`);
    
  } catch (error) {
    console.error('❌ Error seeding commodities:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding
if (require.main === module) {
  seedCommodities();
}

module.exports = { seedCommodities };