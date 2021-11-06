const { MessageAttachment } = require('discord.js')
const {createCanvas} = require('canvas')
const Canvas = require('canvas')
const Path = require('path')

module.exports = async (imageUrl, member) => {
    
    // Canvas Option
    const canvasWidth = 500
    const canvasHeight = 300

    // Initiate canvas
    const canvas = createCanvas(canvasWidth, canvasHeight)
    const ctx = canvas.getContext('2d')

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

    // Load user avatar
    const loadAvatar = await Canvas.loadImage(imageUrl)
    ctx.drawImage(
        loadAvatar, // Image user avatar
        (canvasWidth / 2) - (avatarWidth / 2), // Image Placement for X
        (canvasHeight / 2) - (avatarHeight / 2) + avatarOffsetY, // Image Placement for Y
        avatarWidth, // Image width size
        avatarHeight // Image height size
    )


    // Option for font
    let fontSize = 30
    let lineHeight = 10
    ctx.font = `${fontSize}px Impact`
    ctx.fillStyle = '#fff'

    // Option for text position (recommended 30)
    let textOffsetY = 40
    ctx.textAlign = 'center'

    // Option for text content
    let textUserName = `Welcome ${member.user.tag}!`
    let textUserCount = `Kamu adalah member ke ${member.guild.memberCount}`

    // Print Username and User Count
    ctx.fillText(
        textUserName, // Text Content
        (canvasWidth / 2), // Text Placement for X
        (canvasHeight / 2) + textOffsetY // Text Placement for Y
    )
    ctx.fillText(
        textUserCount, // Text Content
        (canvasWidth / 2), // Text Placement for X
        (canvasHeight / 2) + textOffsetY + lineHeight + fontSize // Text Placement for Y
    )

    // Generate canvas to buffer
    const attachment = new MessageAttachment(canvas.toBuffer())

    // Send to discord from discord bot
    member.guild.channels.cache.get('904977988947423235').send('Welcome To Cafe La Kocak', attachment)


    // console.log area

}
