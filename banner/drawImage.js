const { MessageAttachment } = require('discord.js')
const {createCanvas, registerFont} = require('canvas')
const Canvas = require('canvas')
const Path = require('path')

module.exports = async (imageUrl, member) => {
    
    // Canvas Option
    const canvasWidth = 500
    const canvasHeight = 300

    // Initiate canvas
    const canvas = createCanvas(canvasWidth, canvasHeight)
    const ctx = canvas.getContext('2d')
    
    // Save context so we can undo later
    ctx.save();

    // Load background image
    const bgImage = Path.join(__dirname, '../files/images/background/bg.jpg')
    const loadBg = await Canvas.loadImage(bgImage)
    ctx.drawImage(
        loadBg, // Image for background
        0, // Image Placement for X
        0, // Image Placement for Y
        canvasWidth, // Image width size
        canvasHeight // Image Height size
    )

    // Option user avatar
    const avatarWidth = 100
    const avatarHeight = 100
    const avatarOffsetY = -50
    const aX = canvasWidth / 2
    const aY = canvasHeight / 2

    ctx.beginPath()
    ctx.arc(aX, aY + avatarOffsetY, aX, 0, 2 * Math.PI)

    ctx.clip()

    // Load user avatar
    const loadAvatar = await Canvas.loadImage(imageUrl)
    ctx.drawImage(
        loadAvatar, // Image user avatar
        aX - (avatarWidth / 2), // Image Placement for X
        aY - (avatarHeight / 2) + avatarOffsetY, // Image Placement for Y
        avatarWidth, // Image width size
        avatarHeight // Image height size
    )

    ctx.restore()


    // Function for directing to font file
    // const fontFile = (name) => {
    //     Path.join(__dirname, '../files/font/', name)
    // }

    // Load font
    // registerFont(fontFile('Montserrat-SemiBold.ttf'), {family: "Montserrat", weight: '600'})
    
    // Option for text position (recommended >30)
    let textOffsetY = 40
    ctx.textAlign = 'center'
    
    // Option for font global
    ctx.fillStyle = '#fff'
    let lineHeight = 10

    // Option for font title
    let fontSize = 35
    ctx.font = `600 ${fontSize}px Montserrat`

    // Print Title
    ctx.fillText(
        "Welcome",
        (canvasWidth / 2),
        (canvasHeight / 2) + textOffsetY
    )

    // Option for text content
    let textUserName = `${member.user.tag}!`
    let textUserCount = `Kamu adalah member ke ${member.guild.memberCount}`

    fontSize = 28
    ctx.font = `${fontSize}px Montserrat`

    // Print Username and User Count
    ctx.fillText(
        textUserName, // Text Content
        (canvasWidth / 2), // Text Placement for X
        (canvasHeight / 2) + textOffsetY + lineHeight + (fontSize * 1)// Text Placement for Y
    )
    ctx.fillText(
        textUserCount, // Text Content
        (canvasWidth / 2), // Text Placement for X
        (canvasHeight / 2) + textOffsetY + lineHeight + (fontSize * 2) // Text Placement for Y
    )

    // Generate canvas to buffer
    const attachment = new MessageAttachment(canvas.toBuffer())

    // Send to discord from discord bot
    member.guild.channels.cache.get('904977988947423235').send('Welcome To Cafe La Kocak', attachment)


    // console.log area

}
