# Speech Bubble Debug Utilities - Usage Guide

## Quick Start

### 1. Setup
First, include the debug utilities script in your HTML:
```html
<!-- Add this after your other scripts -->
<script src="debug-utilities.js"></script>
```

### 2. Access Debug Panel
Press `Ctrl + Shift + D` to show/hide the debug control panel

## Debug Features

### 🔍 **Toggle Debug Mode**
- **Purpose**: Makes all speech bubble overlays visible with red borders
- **How to use**: 
  1. Press `Ctrl + Shift + D` to open debug panel
  2. Click "Toggle Debug Mode"
  3. All speech bubble areas will show as red dashed boxes
  4. Each bubble shows its index number

**What you'll see:**
- Red transparent overlays over speech bubble areas
- Index numbers (0, 1, 2...) on each bubble
- Console logs showing all bubble positions

### 📊 **Log Positions**
- **Purpose**: Outputs detailed position data to browser console
- **How to use**: Click "Log Positions" button
- **Output includes**:
  - CSS positioning (left: 40%, top: 10%, etc.)
  - Actual pixel positions on screen
  - Relative positions compared to parent comic panel

### 📐 **Show Grid**
- **Purpose**: Displays percentage grid over comic panels
- **How to use**: 
  1. Click "Show Grid" button
  2. Click on any comic panel to toggle grid overlay
  3. Grid shows 10% increments for easy positioning

### 🖱️ **Interactive Mode**
- **Purpose**: Click on comics to position speech bubbles visually
- **How to use**:
  1. Click "Interactive Mode" button
  2. Look for "📍 Position Bubbles" button that appears on each comic
  3. Click "📍 Position Bubbles" to start positioning mode
  4. Click anywhere on the comic panel
  5. Enter speech bubble text when prompted
  6. Enter width and height percentages
  7. Green preview boxes will appear
  8. Click "✅ Finish" when done
  9. Generated code appears in console and popup modal

## Step-by-Step Workflow

### For New Speech Bubbles:

1. **Enable Interactive Mode**
   ```
   Ctrl + Shift + D → Click "Interactive Mode"
   ```

2. **Start Positioning**
   ```
   Click "📍 Position Bubbles" on desired comic
   ```

3. **Add Bubbles**
   ```
   Click on comic → Enter text → Enter dimensions
   ```

4. **Get Code**
   ```
   Click "✅ Finish" → Copy generated code from popup
   ```

### For Existing Speech Bubbles:

1. **View Current Positions**
   ```
   Ctrl + Shift + D → Click "Toggle Debug Mode"
   ```

2. **Check Alignment**
   ```
   Click "Show Grid" → Click on comic panels
   ```

3. **Get Detailed Data**
   ```
   Click "Log Positions" → Check browser console
   ```

## Console Commands

You can also use these commands directly in the browser console:

```javascript
// Toggle debug visualization
speechBubbleDebugger.toggleDebugMode()

// Log all bubble data
speechBubbleDebugger.logAllBubblePositions()

// Create grid helpers
speechBubbleDebugger.createPositioningHelper()

// Enable interactive positioning
speechBubbleDebugger.enableInteractivePositioning()
```

## Example Generated Code

When you use Interactive Mode, you'll get code like this:

```javascript
speechBubbles: [
    {
        text: "Gēn van hay!",
        left: 42.3,
        top: 15.7,
        width: 25,
        height: 10
    },
    {
        text: "That's not what yow means here!",
        left: 60.1,
        top: 25.4,
        width: 35,
        height: 12
    }
]
```

## Tips for Best Results

### 1. **Positioning Accuracy**
- Use the grid overlay to align to percentage boundaries
- Start with larger bubbles (20-30% width) and adjust down
- Text-heavy bubbles need more width/height

### 2. **Testing Workflow**
1. Add speech bubbles with Interactive Mode
2. Copy generated code to your story-data.js
3. Refresh page and use Debug Mode to verify positioning
4. Adjust percentages as needed

### 3. **Common Dimensions**
- **Short phrases**: 15-25% width, 6-10% height
- **Medium text**: 25-35% width, 8-12% height  
- **Long sentences**: 30-45% width, 10-15% height

### 4. **Positioning Guidelines**
- Leave 5-10% margin from comic edges
- Center important dialogue in clear areas
- Avoid overlapping with character faces

## Troubleshooting

### Debug Panel Not Showing
- Check browser console for errors
- Ensure debug-utilities.js is loaded
- Try pressing `Ctrl + Shift + D` again

### Bubbles Not Aligning
- Use "Log Positions" to see actual vs intended positions
- Check that comic images are fully loaded
- Verify percentage calculations with grid overlay

### Generated Code Not Working
- Ensure proper JSON syntax (commas, brackets)
- Check that speech bubble text doesn't contain quotes
- Verify the scene ID matches your story data

## Development vs Production

The debug utilities automatically detect development environments:
- **Development**: Full debug panel available
- **Production**: Debug features disabled for performance

Force enable in production by adding to console:
```javascript
speechBubbleDebugger.setupDebugControls()
```
